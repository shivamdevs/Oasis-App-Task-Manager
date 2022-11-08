import { Link, useParams } from "react-router-dom";

function Workspaces(props) {
    const params = useParams();
    console.log(params);
    return (
        <>Some Workspace here: {params.wsid}
        <Link to="/xxworkspace/folders">All folders here</Link>

        </>
    );
}
export default Workspaces;