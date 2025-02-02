# Scopes and Cancellation

Temporal Workflows have different types that can be cancelled:

- A timer or an Activity
- An entire Workflow
- A Workflow scope

Workflows are represented internally by a tree of scopes where the `main` function runs in the root scope.
Cancellation propagates from outer scopes to inner ones and is handled by catching `CancellationError`s when `await`ing on `Promise`s.
Each Activity and timer implicitly creates a new scope to support cancellation.

The following example demonstrates how to handle Workflow cancellation by an external client while an Activity is running.

```ts
import { CancellationError } from '@temporalio/workflow';
import { httpGetJSON } from '@activities';

export async function main(url: string) {
  let result: any = undefined;
  try {
    result = await httpGetJSON(url);
  } catch (e) {
    if (e instanceof CancellationError) {
      console.log('Workflow cancelled');
    } else {
      throw e;
    }
  }
  return result;
}
```

Scopes may be cancelled from Workflow code using `cancel`.

```ts
import { CancellationError, cancel, sleep } from '@temporalio/workflow';

export async function main() {
  // Timers and Activities are automatically cancelled when their scope is cancelled.
  // Awaiting on a cancelled scope with throw the original CancellationError.
  const scope = sleep(1);
  cancel(scope);
  try {
    await scope;
  } catch (e) {
    if (e instanceof CancellationError) {
      console.log('Exception was propagated 👍');
    }
  }
}
```

In order to have fine-grained control over cancellation, the Workflow library exports 2 methods for explicitly creating scopes.

The first is `cancellationScope` which when cancelled will propagate cancellation to all child scopes such as timers, Activities and other scopes.

```ts
import { CancellationError, cancellationScope, cancel, sleep } from '@temporalio/workflow';
import { httpGetJSON } from '@activities';

export async function main(urls: string[], timeoutMs: number) {
  const scope = cancellationScope(async () => {
    return Promise.all(urls.map(httpGetJSON));
  });
  try {
    const results = await Promise.race([
      scope,
      sleep(timeoutMs).then(() => {
        cancel(scope);
        // CancellationError rejects the race via scope
        // Any code below this line may still run
      }),
    ]);
    // Do something with the results
  } catch (e) {
    if (e instanceof CancellationError) {
      console.log('Exception was propagated 👍');
    }
  }
}
```

The second is `shield` which prevents cancellation from propagating to child scopes.
Note that by default it still throws `CancellationError` to be handled by waiters.

```ts
import { CancellationError, shield } from '@temporalio/workflow';
import { httpGetJSON } from '@activities';

export async function main(url: string) {
  let result: any = undefined;
  try {
    // Shield and await completion unless cancelled
    result = await shield(async () => httpGetJSON(url));
  } catch (e) {
    if (e instanceof CancellationError) {
      console.log('Exception was propagated 👍');
    }
  }
  return result; // Could be undefined
}
```

In case the result of the shielded Activity is needed despite the cancellation, pass `false` as the second argument to `shield` (`throwOnCancellation`).
To see if the Workflow was cancelled while waiting, check `Context.cancelled`.

```ts
import { Context, shield } from '@temporalio/workflow';
import { httpGetJSON } from '@activities';

export async function main(url: string) {
  const result = await shield(async () => httpGetJSON(url), false);
  if (Context.cancelled) {
    console.log('Workflow cancelled');
  }
  return result;
}
```

More complex flows may be achieved by nesting `cancellationScope`s and `shield`s.
