import {useEffect, useState} from 'react'
import './App.css'
import{Header} from './components/Header/'
import { Main } from './components/Main'

export default function App(){
  const [pokeList, setPokeList] = useState([])
  const[initialCount, setInitialCount] = useState(1)
  const[finalCount, setFinalCount] = useState(10)


  async function getPokemons(){
    try{
      const pokeList=[]

      for(let i=initialCount; i<=finalCount; i++){

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data= await response.json()
        pokeList.push(data)
      }
         
      setPokeList((state)=>[...state, ...pokeList])
    } catch(error){
      console.error(error)
    }
  }

  function handleGetpokemonClick(){
    setInitialCount(finalCount + 1)
    setFinalCount((state)=> state + 10)
  }

  useEffect (()=>{
    getPokemons()
  },[initialCount, finalCount])

  return(
    <>
   <Header/>
    <Main list={pokeList}/>
    <button onClick={handleGetpokemonClick}className='button'>Ver Mais</button>
    <footer>
      <p>&copy| All Right Reserved</p>
    </footer>
    </>
  )
}
