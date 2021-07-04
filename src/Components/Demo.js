import React,{useEffect,useState} from 'react'
import Firebase from './Firebase'
function Demo() {
    // console.log(Firebase);
    let auth = Firebase.auth();
    let [user,setUser] = useState(null);
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [error,setError] = useState('');
    let [loading,setLoading] = useState(false);

    let handleSubmit = async() =>{
        try{
            console.log(email+" "+ password);
            setLoading(true);
            let res = await auth.signInWithEmailAndPassword(email,password);
            console.log(res.user);
            setUser(res.user);
            setLoading(false);
        }
        catch(e){
            setError(e.message);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
        setEmail('');
        setPassword('');
    }

    let handleSignOut = () =>{

    }
    return (
        <>
        { loading ? <h1>Please Wait......Loading</h1>:user==null?
        <div>
            <label >
                Email:
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </label>
            <label >
                Password:
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </label>
            <button onClick={handleSubmit}>Sign In</button>
            {error?<h1>{error}</h1>:<></>}
        </div>:
        <>
        <h2>{user.uid} is Signed in</h2>
        <button OnClick={handleSignOut}>Sign Out</button>
        </>
        }
        </>
    )
}

export default Demo
