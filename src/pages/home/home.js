import React from 'react';
import PageTitle from "../../components/page-title";
import {Link} from "react-router-dom";
import AppCard from "../../components/$widgets/app-card";
import HRLine from "../../components/horizontal-rule/hr-line";

const Home = () => {
    return (
        <div className={'wargames-main'}>
		<PageTitle title='Shadi | Home' className={'py-3'} />
			
		<header className="mt-0 pt-0">
        <div className="row ml-0 mr-0">
            <div className="col-md-6 pr-0">
                <div className="card">
                    <img className="card-img" src="assets/images/left-img.jpg" alt=""/>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center flex-column">
                        <p>Spirituality</p>
                        <hr />
                        <h2>Free template designed
                            by FreeHTML5.co</h2>
                        <a href="article.html" className="btn">READ MORE</a>
                    </div>
                </div>
            </div>
            <div className="col-md-6 pl-0">
                <div className="card">
                    <img className="card-img" src="assets/images/right-img.jpg" alt=""/>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center flex-column">
                        <p>DECOR</p>
                        <hr />
                        <h2>Sed ut perspiciatis unde
                            omnis iste natus</h2>
                        <a href="article.html" className="btn">READ MORE</a>
                    </div>
                </div>
            </div>

            <div className="col-md-3 pr-0 first">
                <div className="card">
                    <img className="card-img" src="assets/images/architecture.png" alt=""/>
                    <div className="card-img-overlay">
                        <h5>Architecture</h5>
                    </div>
                </div>
            </div>

            <div className="col-md-3 pl-0 pr-0">
                <div className="card">
                    <img className="card-img" src="assets/images/interior.png" alt=""/>
                    <div className="card-img-overlay">
                        <h5>Interior</h5>
                    </div>
                </div>
            </div>

            <div className="col-md-3 pl-0 pr-0">
                <div className="card">
                    <img className="card-img" src="assets/images/food.png" alt=""/>
                    <div className="card-img-overlay">
                        <h5>Food</h5>
                    </div>
                </div>
            </div>

        </div>

    </header>

   

		</div>
    );
};

export default Home;