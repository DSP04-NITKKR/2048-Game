export default function HighScore({score}){
    return (
    <div className='highscore'>
      <p>HIGH SCORE : {localStorage.getItem("highscore") || 0}</p>
    </div>
    )
}