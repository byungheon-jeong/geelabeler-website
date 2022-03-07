import React from 'react';
import Layout from '@theme/Layout';

function aboutUs() {
  return (
    <Layout title="Hello">
    <section id="inner-headline">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2 class="pageTitle">About Us</h2>
        </div>
      </div>
    </div>
    </section>
    
      <div class="container">
                
        <div class="about">
        
          <div class="row"> 
            <div class="col-md-12">
              <div class="about-logo">
                <h3>We are awesome <span class="color">TEAM</span></h3>
                <p>Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas</p>
                                    <p>Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas</p>
              </div>
              <a href="#" class="btn btn-color">Read more</a>
            </div>
          </div>
        </div>
      </div>  


      <div class="block-heading-six">
        <h4 class="bg-color">Our Team</h4>
      </div>           
        <div class="team-six">
          <div class="row">
            <div class="col-md-3 col-sm-6">
              <div class="team-member">
                <img class="img-responsive" src="img/team1.jpg" alt=""></img>
                <h4>Johne Doe</h4>
                <span class="deg">Creative</span> 
              </div>
            </div>
          </div>
        </div>



      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          FIndus
        </p>
      </div> */}
    </Layout>
  );
}

export default aboutUs;