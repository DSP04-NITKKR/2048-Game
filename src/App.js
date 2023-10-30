import React from 'react'
import { useState, useEffect } from 'react';
import './App.css';

import cloneDeep from 'lodash/cloneDeep'
import CurrentScore from './CurrentScore';
import HighScore from './HighScore';
import Reset from './Reset';
import Board from './Board';

function App() {

  const [tiles, setTiles] = useState([[0,0,0,0],
                                      [0,2,0,0],
                                      [0,0,0,0],
                                      [0,0,0,0]]);
  // const [play, setPlay] = useState(true);
  const [reload, setReload] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highscore") || 0
  );
  
  useEffect(() => {
    const initialHighScore = parseInt(localStorage.getItem("highscore") || 0);
    setHighScore(initialHighScore);
  }, []);
  

  const reloadIt = React.useCallback(() => {
    setReload(!reload);
  
    if (score > highScore) {
      localStorage.setItem("highscore", score); // Update high score in localStorage
      setHighScore(score); // Update the high score state
    }
  }, [score, highScore, reload]);
  
  
  
  

  const movesLeft = React.useCallback(()=>
  {
    let zeroes = 0;
    for(let i=0; i<4; i++)
    {
      for(let j=0; j<4; j++)
      {
        if(tiles[i][j] === 0)
        {
          zeroes++;
        }
      }
    }

    if(zeroes > 0)
      return true;
    for(let i=0; i<4; i++)
    {
      for(let j=0; j<4; j++)
      {
        if(j<3)
        {
          if(tiles[i][j] === tiles[i][j+1])
          {
            return true;
          }
        }
        if(i<3)
        {
          if(tiles[i][j] === tiles[i+1][j])
          {
            return true;
          }
        }
      }
    }
    return false;
  }, [tiles]);

  const addTile = React.useCallback(() =>
  {
    let zeroes = 0;
    let newTiles = cloneDeep(tiles);
    for(let i=0; i<4; i++)
    {
      for(let j=0; j<4; j++)
      {
        if(newTiles[i][j] === 0)
        {
          zeroes++;
        }
      }
    }
    if(zeroes === 0)
    {
      return;
    }

    let randIndex = Math.floor(Math.random() * zeroes);
    let currIndex = 0;
    for(let i=0; i<4; i++)
    {
      for(let j=0; j<4; j++)
      {
        if(newTiles[i][j] === 0 )
        {
          if(currIndex === randIndex)
          {
            newTiles[i][j] = (Math.random() > 0.75 ? 4: 2);
            setTiles(newTiles);
            return;
          }
          currIndex++;
        }
      }
    }

  }, [tiles] );
  function reset()
  {
    setTiles([
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
    setGameOver(false);
    setScore(0);
  }

  const move = React.useCallback((dir) => 
  {
    let oldTiles = cloneDeep(tiles);
    let newTiles = tiles;
    let newScore = score;
    if(dir === 0)
    {
      for(let j=0; j<4; j++)
      {
        let placeHere=0, atHere= 0;
        while(atHere<4)
        {
          if(atHere === placeHere)
          {
            atHere++;
            continue;
          }
          if(newTiles[placeHere][j] === newTiles[atHere][j])
          {
            if(newTiles[placeHere][j] !== 0)
            {
              newTiles[placeHere][j] *=2;
              newTiles[atHere][j] = 0;
              newScore += newTiles[placeHere][j];
              // console.log(newScore)
              atHere++;
              placeHere++;
            }
            else
            {
              atHere++;
            }
          }
          else
          {
            if(newTiles[placeHere][j] === 0)
            {
              newTiles[placeHere][j] = newTiles[atHere][j];
              newTiles[atHere][j] = 0;
              atHere++;
            }
            else if(newTiles[atHere][j] === 0)
            {
              atHere++;
            }
            else
            {
              placeHere++;
            }
          }
        }
      }

    }
    else if(dir === 1)
    {
      for(let j=0; j<4; j++)
      {
        let placeHere = 0, atHere = 0;
        while(atHere<4)
        {
          if(atHere === placeHere)
          {
            
            atHere++;continue;
          }
          if(newTiles[j][placeHere] === newTiles[j][atHere])
          {
            if(newTiles[j][placeHere] !== 0)
            {
              newTiles[j][placeHere] *=2;
              newTiles[j][atHere] = 0;
              newScore += newTiles[placeHere][j];
              atHere++;
              placeHere++;
            }
            else
            {
              atHere++;
            }
          }
          else
          {
            if(newTiles[j][placeHere] === 0)
            {
              newTiles[j][placeHere] = newTiles[j][atHere];
              newTiles[j][atHere] = 0;
              atHere++;
            }
            else if(newTiles[j][atHere] === 0)
            {
              atHere++;
            }
            else
            {
              placeHere++;
            }
          }
        }
      }
    }
    else if(dir === 2)
    {
      for(let j=0; j<4; j++)
      {
        let placeHere=3, atHere= 3;
        while(atHere>=0)
        {
          if(atHere === placeHere)
          {
            
            atHere--;continue;
          }
          if(newTiles[placeHere][j] === newTiles[atHere][j])
          {
            if(newTiles[placeHere][j] !== 0)
            {
              newTiles[placeHere][j] *=2;
              newTiles[atHere][j] = 0;
              newScore += newTiles[placeHere][j];
              atHere--;
              placeHere--;
            }
            else
            {
              atHere--;
            }
          }
          else
          {
            if(newTiles[placeHere][j] === 0)
            {
              newTiles[placeHere][j] = newTiles[atHere][j];
              newTiles[atHere][j] = 0;
              atHere--;
            }
            else if(newTiles[atHere][j] === 0)
            {
              atHere--;
            }
            else
            {
              placeHere--;
            }
          }
        }
      }
    }
    else if(dir === 3)
    {
      for(let j=0; j<4; j++)
      {
        let placeHere = 3, atHere = 3;
        while(atHere>=0)
        {
          if(atHere === placeHere)
          {
            atHere--;
            continue;
          }
          if(newTiles[j][placeHere] === newTiles[j][atHere])
          {
            if(newTiles[j][placeHere] !== 0)
            {
              newTiles[j][placeHere] *=2;
              newTiles[j][atHere] = 0;
              newScore += newTiles[placeHere][j];
              atHere--;
              placeHere--;
            }
            else
            {
              atHere--;
            }
          }
          else
          {
            if(newTiles[j][placeHere] === 0)
            {
              newTiles[j][placeHere] = newTiles[j][atHere];
              newTiles[j][atHere] = 0;
              atHere--;
            }
            else if(newTiles[j][atHere] === 0)
            {
              atHere--;
            }
            else
            {
              placeHere--;
            }
          }
        }
      }
    }
    if(JSON.stringify(oldTiles) !== JSON.stringify(newTiles))
    {
      setTiles(newTiles);
      addTile();
    }
    if(!movesLeft())
    {
      setGameOver(true);
      
    }
    setScore(newScore);
    reloadIt();
  }, [addTile, movesLeft, reloadIt, score, tiles]);

  const pressedUp = React.useCallback(() => 
  {
    move(0);
  },[move]);
  const pressedLeft= React.useCallback(() => 
  {
    move(1);
  },[move]);
  const pressedDown= React.useCallback(() => 
  {
    move(2);
  },[move]);
  const pressedRight= React.useCallback(() => 
  {
    move(3);
  },[move]);

  

  useEffect(() => {
    const handleKeyDown = (e) => {
    if(e.key === 'w')
    {
      pressedUp();
    }
    else if(e.key === 's')
    {
      pressedDown();
    }
    else if(e.key === 'a')
    {
      pressedLeft();
    }
    else if(e.key === 'd')
    {
      pressedRight();
    }
    else if(e.keyCode === 37)
    {
      pressedLeft();
    }
    else if(e.keyCode === 38)
    {
      pressedUp();
    }
    else if(e.keyCode === 39)
    {
      pressedRight();
    }
    else if(e.keyCode === 40)
    {
      pressedDown();
    }
  };
  window.addEventListener('keydown', handleKeyDown);

  // Clean up the event listener when the component unmounts
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [pressedUp, pressedDown, pressedLeft, pressedRight]);

  return (
    <>
    <div className='main-section'>
      <CurrentScore score={score} />
      <div>
        {gameOver && <div className='gameover'>
          <p>Game Over</p>
        </div>}
        <Board tiles={tiles} />
      </div>
      <div className='bottom-line'>
        <Reset reset={reset}/>
        <HighScore highScore={highScore} />
      </div>
      <div className='controls'>
        <button className='up' onClick={pressedUp}> </button>
        <button className='left' onClick={pressedLeft}> </button>
        <button className='circle' > </button>
        <button className='right' onClick={pressedRight}> </button>
        <button className='down' onClick={pressedDown}> </button>
      </div>
    </div>

    
    </>
  );
}

export default App;
