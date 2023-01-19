import {getGames} from "../service/api/game.service";

export default class Action {
    static UpdateDevice = "UpdateDevice";
    static UpdateWebLocation = "UpdateWebLocation";
    static UpdateUser = "UpdateUser";
    static UpdateAdmin = "UpdateAdmin";
    static Games = "Games";

    dispatch;

    constructor({context, dispatch}) {
        this.dispatch = dispatch || context.props.dispatch;
    }

    updateDevice(device) {
        this.dispatch({type: Action.UpdateDevice, device})
    }

    updateWebLocation(location) {
        this.dispatch({type: Action.UpdateWebLocation, location})
    }

    updateUser(user) {
        this.dispatch({type: Action.UpdateUser, user})
    }

    updateAdmin(admin) {
        this.dispatch({type: Action.UpdateAdmin, admin})
    }
}
