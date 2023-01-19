import React from 'react';
import PageTitle from "../../components/page-title";
import Line from "../../components/horizontal-rule/hr-line";
import {Link} from "react-router-dom";
import './we-call.scss'

const weCall = () => {
    return (
        <div className={'we-call-main'}>
            <PageTitle title='Wecall Scoreboard' className={'py-3'}/>
            <div className="container-fluid mb-4 py-sm-4">
                <p className={'py-3 text-white'}>
                    OverTheWire makes use of a scoreboard provided by <a className="link2"
                                                                         href={'https://www.wechall.net/'}
                                                                         target="_blank">WeChall</a> to allow
                    players to track their own progress and promote some healthy competition between players. To
                    make use of this scoreboard for OverTheWire games, you need to follow these steps:
                </p>

                <ol className={'list'} type={"1"}>
                    <li>
                        First, go to <a className="link2" href={'https://www.wechall.net/'}
                                        target="_blank">WeChall</a> and register for an account.
                    </li>
                    <li>
                        Next, log in and retrieve your WeChall token and username. Your WeChall username is what
                        you registered with, while your WeChall token can be found on the WeChall website under <a
                        className="link2" href={'https://www.wechall.net/warboxes'}
                        target="_blank"> 'Account - WarBoxes' </a> . The token looks something like
                        “EDD76-1FC9F-7388B-DC6EB-E3F71-FC4CB”.
                    </li>
                    <li>
                        Next, assuming you are using the correct operating system, edit your ~/.bashrc file and
                        add:
                        <div className="code-group">
                            <div className="inner">
                                <code>export WECHALLUSER="YourUserName"</code>
                                <code>export WECHALLTOKEN="YOUR-WECHALL-TOKEN-HERE"</code>
                            </div>
                        </div>

                        <p>For fish users, you may run:</p>
                        <div className="code-group">
                            <div className="inner">
                                <code>set -Ux WECHALLUSER "YourUserName"</code>
                            </div>
                        </div>
                        <p>You may need to logout and login again for these changes to take effect. To test whether
                            the environment variables are registered, type “echo $WECHALLUSER”, which should show that
                            environment variable.
                        </p>
                    </li>
                    <li>
                        Next, edit ~/.ssh/config (or create it if it doesn’t exist) and add:

                        <div className="code-group">
                            <div className="inner">
                                <code>Host *.labs.overthewire.org</code>
                                <code>SendEnv WECHALLTOKEN</code>
                                <code>SendEnv WECHALLUSER</code>
                            </div>
                        </div>
                        <p>This configures your SSH client to transmit both username and token to your remote session,
                            so it can be used there.
                        </p>
                    </li>
                    <li>
                        Finally, you are able to easily register which levels you have beaten on OverTheWire by
                        logging in through SSH the normal way, and invoking the “wechall” command. This command will
                        use your WeChall username and WeChall token to register the level you have beaten with
                        WeChall.
                    </li>
                </ol>

            </div>
        </div>
    );
};

export default weCall;