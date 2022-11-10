import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, createWorkspace } from "../../firebase";
import { Input } from "../Elements/Elements";
import css from './../../styles/workspaces.module.css';

function Workspaces(props) {
    props.setTitle("All", "Workspaces");
    const [workspaceName, setWorkspaceName] = useState("");
    const [workspaceError, setWorkspaceError] = useState("");
    const [workspaceDisabled, setWorkspaceDisabled] = useState(false);

    const [user] = useAuthState(auth);
    const workspaceSubmit = async (e) => {
        e.preventDefault();
        if (!workspaceName) return e.target[0].focus();

        setWorkspaceError("");
        setWorkspaceDisabled(true);

        const auth = await createWorkspace(user, workspaceName);
        if (auth?.error) {
            setWorkspaceError(auth.error);
            e.target[0].focus();
        }

        setWorkspaceDisabled(false);
    };
    return (
        <div className={css.space}>
            <div className={css.title}>Workspaces</div>
            <div className={css.card}>
                <div className={css.head}>Create a new Workspace</div>
                <form className={css.newarea} action="" onSubmit={workspaceSubmit}>
                    <Input
                        type="text"
                        label="Workspace Name"
                        info="Name should be unique from your other workspaces"
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        autoComplete="true"
                        error={workspaceError || ""}
                        required={true}
                    />
                    <div className={css.areasubmit}><button disabled={workspaceDisabled} className="linker" type="submit">Create</button></div>
                </form>
            </div>
        </div>
    );
}
export default Workspaces;