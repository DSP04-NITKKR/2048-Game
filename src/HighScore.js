export default function HighScore({highScore}){
    return (
    <div className='highscore'>
      <p>HIGH SCORE : {highScore || 0}</p>
    </div>
    )
}