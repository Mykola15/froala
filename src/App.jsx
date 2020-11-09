import React, {useCallback, useEffect, useState} from 'react';
import Froala from "./Froala";
import FroalaEditor from 'froala-editor';


const App = () => {
    const [test, setTest] = useState();
    const [vision, setVision] = useState();

    // document.onselectionchange = function() {
    //     setTest(document.getSelection().toString());
    // };
    // useEffect(()=>{
    //     if(test){
    //      console.log(test);}
    // },[test]);
    useEffect(() => {
        if (test) {
            setVision(false);
        } else {
            setVision(true);
        }
    }, [test]);

    return (
        <>
            <Froala id="froala-editor" select={test} vision={vision}/>
        </>
    );

};

export default App;