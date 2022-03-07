import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '../index.module.css';

// import HomepageFeatures from './components/HomepageFeatures';

function AboutUs() {
  return (
    <Layout title="About Us">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
         This only shows if compilation fails
        </p>
      </div>
    </Layout>
  );
}

export default AboutUs;