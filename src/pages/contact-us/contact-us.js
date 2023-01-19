import React from 'react';
import PageTitle from "../../components/page-title";
import './contact-us.scss'

const contactUs = () => {
    return (
        <div className={'contact-main'}>
            <PageTitle title='General chat rules' className={'py-3'}/>
            <div className="container-fluid p-3 px-4">
                <div>
                    <section className={'contact-section'}>
                        <h5 className={'rule-heading'}> General chat rules </h5>
                        <p className={'rule-text'}> No spoilers in chat</p>
                        <p className={'rule-text'}> Tell us the game and level, nothing more (salutations are
                            accepted)
                        </p>
                        <p className={'rule-text'}> Be patient, someone will offer you a PM</p>
                        <p><span className={'text-pink1'}>NOTE:</span> You might want to read this <a className="link2"
                                                                                                      href='http://catb.org/~esr/faqs/smart-questions.html'
                                                                                                      target={'_blank'}> article </a> before
                            asking for help
                            :)
                        </p>
                    </section>

                    <section className={'contact-section'}>
                        <h5 className={'rule-heading'}> Discord </h5>
                        <p className={'rule-text'}>
                            You can find our Discord server at
                            <a className={'link2 ml-1'} href='https://discord.gg/CPDYM3G'
                               target={'_blank'}>https://discord.gg/CPDYM3G </a>
                        </p>

                        <div className="row">
                            <div className="code-group col-12 col-lg-3 px-0">
                                <div className="inner mr-2">
                                    <p> Channels:</p>
                                    <code className={'ml-4'}> #wargames (for talk related to the games)</code>
                                    <code className={'ml-4'}> #social (for general talk)</code>
                                </div>
                            </div>
                        </div>

                        <div className={'rule-text'}> Please be aware of our rules! When you first connect, you will
                            be reminded of them.
                        </div>
                    </section>

                    <section className={'contact-section'}>
                        <h5 className={'rule-heading'}> IRC </h5>
                        <div className={'rule-text'}>If you don’t know
                            <a className="link2"
                               href='https://en.wikipedia.org/wiki/Wikipedia:IRC/Tutorial'
                               target={'_blank'}> how to use IRC </a>, use
                            google to find out.
                        </div>

                        <div className="row">
                            <div className="code-group col-12 col-md-6 col-lg-3 px-0">
                                <div className="inner mr-2">
                                    <p>Encrypted IRC:</p>
                                    <code className={'ml-4'}>Host: ircs.overthewire.org</code>
                                    <code className={'ml-4'}>Port: 6697 (with SSL)</code>
                                </div>
                            </div>

                            <div className="code-group col-12 col-md-6 col-lg-3 px-0">
                                <div className="inner mr-2">
                                    <p>Non-encrypted IRC:</p>
                                    <code className={'ml-4'}>Host: irc.overthewire.org</code>
                                    <code className={'ml-4'}>Port: 6667</code>
                                </div>
                            </div>
                        </div>

                        <div className={'rule-text'}> The channels used on IRC are the same as on Discord.</div>
                    </section>
                </div>
            </div>


        </div>
    );
};

export default contactUs;