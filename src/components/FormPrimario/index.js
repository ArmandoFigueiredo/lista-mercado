import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export function FormPrimario() {
    
    const [formPri, setForm] = useState ({
        atrForca:0,
        atrDestreza:0,
        atrConst:0,
        atrCarisma:0,
        atrIntel:0,
        atrVontade:0,
    });        

    function handleChange(evento) {
        setForm({...formPri, [evento.target.name]:evento.target.value});
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        console.log("dancinha")
        try{
            const resposta = await axios.post("https://ironrest.herokuapp.com/chrbuilder", formPri)
            console.log("parapar");
        }catch (err){
            console.log(err);
        }

        function handleToast() {
            toast((t) => (
                <span>
                  Você realmente quer <b>deletar</b> essa ficha?
                  <button onClick={() => {
                    handleDlete(t)                    
                  }}>Sim</button>
                  <button onClick={() => toast.dismiss(t.id)}>Não</button>
                </span>
              ));
        }
        async function handleDlete(t) {
            try{
                await axios.delete(`https://ironrest.herokuapp.com/chrbuilder/${formPri}`, formPri);

                toast.dismiss(t.id);
                navigate("/");
            }catch (err){
                console.log(err);
            }
        }    
    }


    return(<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="forca">Força</label>
            <input id="forca" name="atrForca" type="number" value={formPri.atrForca} onChange={handleChange}/>
            
            <label htmlFor="destreza">Destreza</label>
            <input id="destreza" name="atrDestreza" type="number" value={formPri.atrDestreza} onChange={handleChange}/>
                        
            <label htmlFor="const">Constituição</label>
            <input id="const" name="atrConst" type="number" value={formPri.atrConst} onChange={handleChange}/>
                        
            <label htmlFor="carisma">Carisma</label>
            <input id="carisma" name="atrCarisma" type="number" value={formPri.atrCarisma} onChange={handleChange}/>
                        
            <label htmlFor="intel">Inteligência</label>
            <input id="intel" name="atrIntel" type="number" value={formPri.atrIntel} onChange={handleChange}/>
                        
            <label htmlFor="vontade">Vontade</label>
            <input id="vontade" name="atrVontade" type="number" value={formPri.atrVontade} onChange={handleChange}/>
            
            <button type="submit">Send</button>
            <Link to={`/edit/${}`}>
             <button type="submit">Edit</button>
             <button onClick={handleToast}>Delete</button>
            </Link>

        </form>
        
    </>)



}