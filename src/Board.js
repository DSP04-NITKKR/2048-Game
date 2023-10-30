import TileRow from './TileRow';
export default function Board({tiles}){
    return (
        <div className='board'>
          <TileRow value={tiles[0]} />
          <TileRow value={tiles[1]} />
          <TileRow value={tiles[2]} />
          <TileRow value={tiles[3]} />
        </div>
    )
}