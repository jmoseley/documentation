import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function Security() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Temporal Security"
      permalink="/security"
      description="<head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Temporal security</h1>
          <p className="hero__subtitle">Our commitment</p>
        </div>
      </header>
      <div className={clsx('hero hero--secondary', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx('col col--5', styles.securityPageHeaders)}>
              <h2>Our Stack</h2>
            </div>
            <div className={clsx('col col--4', styles.justifyLeft)}>
              <p>The Temporal Cloud, an instance of our open source <a href="https://github.com/temporalio/temporal">Temporal Server software</a>, is hosted on AWS and we
              use <a href="https://www.datastax.com/products/datastax-astra">Astra Datastax</a> for data storage.</p>
            </div>
          </div>
          <div className="row">
            <div className={clsx('col col--5', styles.securityPageHeaders)}>
              <h2>Encryption</h2>
            </div>
            <div className={clsx('col col--4', styles.justifyLeft)}>
              <p>All traffic to and from the Temporal Cloud is encrypted with mTLS.</p>
              <p>Customers have access to <a href="https://docs.temporal.io/docs/server/security">data encryption tools</a> to encrypt data at rest.</p>
            </div>
          </div>
          <div className="row">
            <div className={clsx('col col--5', styles.securityPageHeaders)}>
              <h2>SOC2 Type 1</h2>
            </div>
            <div className={clsx('col col--4', styles.justifyLeft)}>
              <p>Temporal Technologies Inc was issued a clean SOC2 Type 1 report on Janurary 31st 2021 from <a href="https://www.connor-consulting.com/">Connor Consulting</a></p>
              <div className={styles.justifyCenter}>
                <img className={styles.soc2Logo} src={useBaseUrl("img/21972-312_SOC_NonCPA_Blk.png")} alt="SOC2 Logo" />
              </div>
              <p>To request a copy of the report, contact us.</p>
            </div>
          </div>
          <div className="row">
            <div className={clsx('col col--5', styles.securityPageHeaders)}>
              <h2>Responsible Disclosure</h2>
            </div>
            <div className={clsx('col col--4', styles.justifyLeft)}>
              <p>If you have any concerns about security or would like to report a security issue, please reach out to our team at <a href="mailto:security@temporal.io">security@temporal.io</a>.</p>
              <p>We promise not to bring legal action against people who do the following:</p>
              <ul>
                <li>Share with us the full details of any problem they've found.</li>
                <li>Keep the issue private until we've had a reasonable time to address it.</li>
                <li>Don't intentionally harm our service or exfiltrate data from it</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
