import React,{useEffect,useState} from 'react'
import Node from "./Node/Node"
import "./PathfindingVisualizer.css"
import Astar from '../astaralgo/astar'
const cols =25;
const rows=10;

const NODE_START_ROW = 0;
const NODE_END_ROW = rows-1;
const NODE_START_COL = 0;
const NODE_END_COL = cols-1;


function PathfindingVisualizer() {
    const [Grid,setGrid] = useState([]);
    const [Path,setPath]= useState([]);
    const [VisitedNodes,setVisitedNodes] = useState([]);


    useEffect(()=>{
        intializeGird();
    },[])

    //Creates Grid
    const intializeGird = ()=>{
        const grid = new Array(rows);
        for(let i=0;i<rows;i++)
        {
            grid[i] = new Array(cols);
        }
        createSpot(grid);
        setGrid(grid);
        addNeighbours(grid);
        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const endNode = grid[NODE_END_ROW][NODE_END_COL];
        let path = Astar(startNode,endNode);
        if(path.error)
        {
           alert("The upcoming grid setup has no path ! Refresh to get a new gird setup.")
        }
        startNode.isWall=false;
        endNode.isWall=false;
        setPath(path.path);
        setVisitedNodes(path.visitedNodes);
    }

    //Creates spot
    const createSpot = (grid)=>{
        for(let i=0;i<rows;i++)
        {
            for(let j=0;j<cols;j++)
            {
                grid[i][j]= new Spot(i,j);
            }
        }
    };
    //Add negihbours
    const addNeighbours = (grid) =>{
        for(let i=0;i<rows;i++)
        {
            for(let j=0;j<cols;j++)
            {
                grid[i][j].addneighbours(grid);
            }
        }
    }
    //spot constructor
    function Spot(i,j)
    {
       this.x=i;
       this.y=j;
       this.isStart=this.x === NODE_START_ROW && this.y === NODE_START_COL;
       this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
       this.g=0;
       this.f=0;
       this.h=0;
       this.neighbours =[];
       this.isWall = false;
       if(Math.random(1)<0.2)
       {
           this.isWall=true;
       }
       this.previous =undefined;
       this.addneighbours=function(grid)
       {
           let i = this.x;
           let j= this.y;
           if(i>0) this.neighbours.push(grid[i-1][j]);
           if(i<rows-1) this.neighbours.push(grid[i+1][j]);
           if(j>0) this.neighbours.push(grid[i][j-1]);
           if(j<cols-1) this.neighbours.push(grid[i][j+1]);
       }
    }


    //grid with node
    // console.log(Grid;
    const gridwithNode = (
        <div>
            {Grid.map((row,rowIndex)=>{
                return (
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col,colIndex)=>{
                            const {isStart,isEnd,isWall} = col;
                            return <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall}/>
                        })}
                    </div>
                )
            })}
        </div>
    )

    const visualizeSHortestPath = (shortestPathNodes)=>{
        for(let i=0; i<shortestPathNodes.length;i++)
        {
            setTimeout(()=>{
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
            },10*i)
        }
    }
    const visualizePath =()=>{
        for(let i=0; i<=VisitedNodes.length;i++)
        {
            if(i === VisitedNodes.length)
            {
            setTimeout(()=>{
               visualizeSHortestPath(Path)
            },20*i)
        }
        else
        {
            setTimeout(()=>{
                const node = VisitedNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
            },20*i)
        }
        }
    }

    return (

        <div className="wrapper">
            <h1>Path finder- A*</h1>
            {/* <form>
            <h3>Enter number of rows : <input type="text"></input></h3>
            <h3>Enter number of coloumns : <input type="text"></input> </h3>
            </form> */}
            {/* <button type="button" onClick={onSubmit}>Save</button> */}
            <button className="btn" onClick={visualizePath}>Click to Visualize A* Path</button>
            {gridwithNode}
        </div>
    )
}

export default PathfindingVisualizer
