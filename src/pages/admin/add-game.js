import React, {useReducer, useState, useEffect} from 'react';
import Utils from "../../service/core/utils";
import AppInput from "../../components/$widgets/app-input/app-input";
import {useHistory, useParams} from "react-router-dom";
import {addGame} from "../../service/api/admin.service";
import PageTitle from "../../components/page-title";
import {connect} from "react-redux";
import {updateGame} from "../../service/api/admin.service";
import {getGameById} from "../../service/api/admin.service";
import Button from "../../components/$widgets/button";
import './styles.scss'
import AppTextEditor from "../../components/$widgets/app-input/app-text-editor";
import AppSwitch from "../../components/$widgets/app-switch/app-switch";
import AppTextArea from "../../components/$widgets/app-input/app-textarea";
import AppSelect from "../../components/$widgets/app-select/app-select";
import data from './data.json'

const formState = {
    game_type: Utils.blankInput(),
    slug: Utils.blankInput(),
    description: Utils.blankInput(),
    host: Utils.blankInput(),
    port: Utils.blankInput(),
};

function validateForm(form) {
    const {slug, description, game_type} = form;
    let hasError = false;

    if (game_type.value === '') {
        game_type.error = 'Field is required';
        hasError = true;
    }

    if (slug.value === '') {
        slug.error = 'Field is required';
        hasError = true;
    }
    if (description.value === '') {
        description.error = 'Field is required';
        hasError = true;
    }


    return {form, hasError};
}

const AddGame = ({dispatch}) => {

    const [form, dispatch1] = useReducer(Utils.formReducer(formState), formState);
    const history = useHistory();
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [htmlMode, setHtmlMode] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch1({type: 'update-field', name, value});
    };

    const getGameDetails = async () => {
        setLoading(true);
        const {data: game} = await getGameById(id);
        const formState = {
            game_type: Utils.blankInput(game.game_type),
            slug: Utils.blankInput(game.slug),
            description: Utils.blankInput(game.description),
            host: Utils.blankInput(game.sshInfo.host),
            port: Utils.blankInput(game.sshInfo.port),
        };
        dispatch1({type: 'update-form', value: formState});
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const {form: newFormState, hasError} = validateForm(form);
        dispatch1({type: 'update-form', value: newFormState});

        if (!hasError) {
            const game = {
                game_type: form.game_type.value,
                slug: form.slug.value,
                description: form.description.value
            }
            if (form.host.value || form.port.value) {
                game.sshInfo = {
                    host: form.host.value,
                    port: form.port.value,
                }
            }
            setLoading(true)
            let error;
            if (id) {
                const {response} = await updateGame(game, id);
            } else {
                error = await addGame(game);
            }
            setLoading(false);
            if (error && error.result.status != 200) return

            dispatch1({type: 'reset'});
            history.push('/admin/games');
        } else {
            console.log(hasError);
            console.log("error");
        }
    };


    useEffect(() => {
        if (id) {
            getGameDetails();
        }
    }, [])

    const handleModeChange = ({name, checked}) => {
        setHtmlMode(checked)
    }

    return (

        <div>
            <PageTitle className={'py-3'} title={!id ? "Add Game" : "Edit Game"}/>
            <section className="">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="add-game-main col-12">
                            <form onSubmit={handleSubmit} className="form-contact" id="addgameform"
                                  data-aos="fade-right"
                                  data-aos-duration="800">

                                <AppSelect onChange={handleChange}
                                           label={'Game Type'}
                                           field={form.game_type}
                                           options={data.game_type_options}
                                           name="game_type"
                                />

                                <AppInput type="text"
                                          label={'Name'}
                                          onChange={handleChange}
                                          field={form.slug}
                                          onEnter={handleSubmit}
                                          name="slug" id="slug"
                                          placeholder="Game name"/>

                                {htmlMode
                                    ? <AppTextArea type="text"
                                                   label={'Description'}
                                                   onChange={handleChange}
                                                   field={form.description}
                                                   onEnter={handleSubmit}
                                                   name="description" id="description"
                                                   placeholder="Description"/>
                                    : <AppTextEditor
                                        label={'Description'}
                                        onChange={handleChange}
                                        field={form.description}
                                        onEnter={handleSubmit}
                                        name="description"
                                        id="description"
                                        placeholder="Add game description"/>}

                                <AppSwitch name={'mode'}
                                           checked={htmlMode}
                                           label={'Html Editor Mode'}
                                           handleChange={handleModeChange}/>

                                <AppInput
                                    label={'Host'}
                                    onChange={handleChange}
                                    field={form.host}
                                    onEnter={handleSubmit}
                                    type="text"
                                    name="host"
                                    id="host"
                                    placeholder="Add host"/>

                                <AppInput
                                    label={'Port'}
                                    onChange={handleChange}
                                    field={form.port}
                                    onEnter={handleSubmit}
                                    type="text"
                                    name="port"
                                    id="port"
                                    placeholder="Add port"/>


                                <Button title={'Submit'}
                                        disabled={loading}
                                        loading={loading}
                                        className="mt-4"
                                        type="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
};

export default connect()(AddGame);