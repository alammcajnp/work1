import React, {useReducer, useState, useEffect} from 'react';
import Utils from "../../service/core/utils";
import AppInput from "../../components/$widgets/app-input/app-input";
import {Link, useHistory, useParams} from "react-router-dom";
import {AllGames} from "../../service/api/admin.service";
import {addLevel} from "../../service/api/admin.service";
import PageTitle from "../../components/page-title";
import {updateLevel} from "../../service/api/admin.service";
import {getLevelById} from "../../service/api/admin.service";
import {connect} from "react-redux";
import Action from "../../redux/action";
import Button from "../../components/$widgets/button";
import {toast, ToastContainer} from 'react-toastify';
import './styles.scss'
import AppTextEditor from "../../components/$widgets/app-input/app-text-editor";
import AppSwitch from "../../components/$widgets/app-switch/app-switch";
import AppTextArea from "../../components/$widgets/app-input/app-textarea";
import data from "./data.json";
import AppSelect from "../../components/$widgets/app-select/app-select";


const formState = {
    game_id: Utils.blankInput(),
    text: Utils.blankInput(),
    description: Utils.blankInput(),
};

function validateForm(form) {
    const {game_id, text, description} = form;
    let hasError = false;

    if (game_id.value === '') {
        game_id.error = 'Field is required';
        hasError = true;
    }
    if (text.value === '') {
        text.error = 'Field is required';
        hasError = true;
    }
    if (description.value === '') {
        description.error = 'Field is required';
        hasError = true;
    }
    return {form, hasError};
}

const AddLevel = ({dispatch}) => {
    const [form, dispatch1] = useReducer(Utils.formReducer(formState), formState);
    const history = useHistory();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [gameOptions, setGameOptions] = useState([]);
    const [htmlMode, setHtmlMode] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch1({type: 'update-field', name, value});
    };
    const getLevelDetails = async () => {
        const {data: level} = await getLevelById(id);
        const formState = {
            game_id: Utils.blankInput(level.level.game_id),
            text: Utils.blankInput(level.level.text),
            description: Utils.blankInput(level.level.description)
        };
        dispatch1({type: 'update-form', value: formState});
    }

    const getGames = async () => {
        const data_games = await AllGames();
        const games = data_games.data;
        const gameOptions = games.map(g => ({label: g.slug, value: g._id}))
        setGameOptions(gameOptions);
    }
    useEffect(() => {
        getGames();
        if (id) {
            getLevelDetails();
        }
    }, [])

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const {form: newFormState, hasError} = validateForm(form);
        dispatch1({type: 'update-form', value: newFormState});
        if (!hasError) {
            const level = {
                game_id: form.game_id.value,
                text: form.text.value,
                slug: form.text.value.replace(/[^A-Z0-9]/ig, "").toLowerCase(),
                description: form.description.value
            }
            setLoading(true);
            let res;
            if (id) {
                res = await updateLevel(level, id);
            } else {
                res = await addLevel(level);
            }
            setLoading(false)
            dispatch1({type: 'reset'});
            history.push('/admin/levels');
        } else {
            console.log(hasError);
            console.log("error");
        }
    };
    const handleModeChange = ({name, checked}) => {
        setHtmlMode(checked)
    }

    return (
        <div>
            <PageTitle className={'py-3'} title={id ? "Edit Level" : "Add Level"}/>
            <section className="tf-contact">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="add-game-main col-12">
                            <form onSubmit={handleSubmit} className="form-contact" id="addgameform"
                                  data-aos="fade-right" data-aos-duration="800">

                                <AppSelect onChange={handleChange}
                                           label={'Select Game'}
                                           field={form.game_id}
                                           options={gameOptions}
                                           name="game_id"/>

                                <AppInput type="text" label={'Name'}
                                          onChange={handleChange}
                                          field={form.text}
                                          onEnter={handleSubmit}
                                          name="text" id="text"
                                          placeholder="Level name"/>

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

export default connect()(AddLevel);