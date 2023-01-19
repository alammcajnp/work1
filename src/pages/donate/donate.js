import React, {useState} from 'react';
import PageTitle from "../../components/page-title";
import patreon from '../../assets/images/patreon.png';
import paypal from '../../assets/images/paypal.png';
import {useHistory, useParams, Link} from "react-router-dom";
import data from './donate-data.json'
import './donate.scss'
import securityImage from '../../assets/images/interceptsecurity.png'
import {AppImage} from "../../components/$widgets/app-image/app-image";

const Donate = () => {
    const fancySupportLevels = data.fancySupportLevels

    return (
        <div className={'donate-main'}>
            <PageTitle title='Donate' className={'py-3'}/>

            <div className="container-fluid py-3 px-4">
                <h5 className={'pb-4'}>Donating</h5>

                <p>
                    We gladly accept donations! We prefer receiving monthly donations via Patreon, since this
                    allows us to give perks to sponsors. However, PayPal donations are also an option.
                </p>

                <div className="image-row my-2 my-sm-3 d-flex row">
                    <div className={'donation patreon ml-sm-0 col-12 col-sm-4 col-md-3 mr-sm-3 my-2'}>
                        <a href="https://www.patreon.com/join/StevenVanAcker" target={'_blank'}>
                            <img src={patreon}/> </a>
                    </div>

                    <div className={'donation paypal col-12 col-sm-4 col-md-3 mr-sm-3 my-2'}>
                        <a href="https://www.paypal.com/paypalme/overthewire" target={'_blank'}>
                            <img src={paypal}/></a>
                    </div>
                </div>

                <p>
                    Please <Link className="link2" to={'contact'}>contact us </Link> if you want to
                    donate in another way
                </p>

                <h6 className={'py-4'}>Huge thanks to our Patrons</h6>



            </div>

            <div className="container-fluid py-3 px-4 container2">
                <div className={'angel-fancy-wrapper row'}>
                    <div className="angel col-12 col-lg-6 px-0">
                        <h6>"Angel" Support Level</h6>
                        <p className={'support-desc'}>
                            <a className={'security-image'} href="src/pages/donate/donate" target={"_blank"}><AppImage src={securityImage} /></a>
                            Intercept Security is a security company with a single goal: bringing simplicity to
                            Security. We build Fast Intercept – a security automation product that helps bring the
                            technology to organizations what would otherwise not be able to afford or support such a
                            solution. We also provide consulting services and engineering to help teams lower their
                            costs, improve their security posture, and reduce mean time to resolution (MTTR) of
                            security incident response. We love (Love-love) overthewire as a training tool and its
                            spirit in the community as a whole and are happy to support.
                            Visit our website and take advantage of the free Community IP Threatlist we offer from
                            our global honeypot network, or reach out and see if we can't make a connection. We're
                            always looking to make new friends. :)
                        </p>
                    </div>

                    <div className="fancy col-12 col-lg-6 px-0 px-lg-3">
                        <h6>"Fancy" Support Level</h6>
                        <p className={'support-level-wrapper'}>
                            {
                                fancySupportLevels.map((l) => {
                                    return <span className={'support-level-item'}>{l}</span>
                                })
                            }
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Donate;