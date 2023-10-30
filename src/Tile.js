const colors = {
    0 : "#444444",
    2 : "#56CBF9",
    4 : "#EFD9CE",
    8 : "#EDD9A3",
    16 : "#74D3AE",
    32 : "#8ACDEA",
    64 : "#FE5E41",
    128 : "#8F6593",
    256 : "#FCD581",
    512 : "#44BBA4",
    1024 : "#FF5964",
    2048 : "#FF6392",
    4096 : "#3D348B"
}

function Tile({value})
{
    
    var tileVal = '';
    if(value !== 0)
    {
        tileVal = value;
    }
    return (
        <div 
        className="tile"
        style={
            {backgroundColor: colors[value]}
        }
        >
            <p>{tileVal}</p>
        </div>
    )
}

export default Tile;