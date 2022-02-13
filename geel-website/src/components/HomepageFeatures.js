import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        GEE-Labler is written so that the only things for the user to do is to label
      </>
    ),
  },
  {
    title: 'Label Your Images',
    Svg: require('../../static/img/etiquette.svg').default,
    description: (
      <>
        GEE-Labler allows you to generate training data from TIFF files using a GUI labeler
      </>
    ),
  },
  {
    title: 'Powered by Python',
    Svg: require('../../static/img/python-logo-generic.svg').default,
    description: (
      <>
        Allows debugging or script expansion using python
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
