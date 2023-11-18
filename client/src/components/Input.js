const Input = ({Text,Type}) =>{
    return(
        <>
            <div>
                <label>{Text}</label>
            </div>
            <input type={Type}></input>
        </>
    );
}

export default Input;