import './style.css';

const DocumentsTemplates = () => {

    return(
        <>
            <div className="content">
                <h2 className='pageTitle'>Template Editor</h2>

                <div id='templateOptions'>
                    <button>Add new status</button>
                    <button>Add new template</button>
                </div>

                <table>
                    <tr>
                        <th>Lp</th>
                        <th>Title</th>
                        <th>Options</th>
                        <th>Activity</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Wniosek</td>
                        <td><button>Open</button><button>Delete</button></td>
                        <td><div className='activity'></div></td>
                    </tr>
                </table>
            </div>
        </>
    );
}


export default DocumentsTemplates;