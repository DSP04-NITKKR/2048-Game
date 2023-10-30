
import Tile from './Tile';

function TileRow({value})
{
    return (
      <div className="tile-row">
        <Tile value={value[0]} />
        <Tile value={value[1]} />
        <Tile value={value[2]} />
        <Tile value={value[3]} />
      </div>
    )
}

export default TileRow;