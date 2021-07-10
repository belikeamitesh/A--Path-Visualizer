function Astar(startNode, endNode)
{
    let openset =[];
    let closedset = [];
    let path = [];
    let visitedNodes =[];


    openset.push(startNode);
    while(openset.length>0)
    {
        let leastIndex = 0;
        for(let i = 0; i < openset.length; i++)
        {
            if(openset[i].f < openset[leastIndex].f)
            {
                leastIndex=i;
            }
        }
        let current = openset[leastIndex];
        visitedNodes.push(current);

        if(current === endNode)
        {
            let t=current;
            path.push(t);
            while(t.previous)
            {
                path.push(t.previous);
                t=t.previous;
            }
            // console.log(path);
            return {path,visitedNodes};
            // console.log("DOne!");
        }


        openset = openset.filter(elt => elt !== current);
        closedset.push(current);
        let neighbours = current.neighbours;
        for(let i = 0; i < neighbours.length; i++)
        {
           let neighbour =  neighbours[i];
           if(!closedset.includes(neighbour) && !neighbour.isWall)
           {
               let temp = current.g+1;
               let newPath = false;
               if(openset.includes(neighbour))
               {
                   if(temp < neighbour.g)
                   {
                       neighbour.g = temp;
                       newPath=true;
                   }
               }
               else{
                neighbour.g = temp;
                newPath=true;
                openset.push(neighbour);
               }

               if(newPath)
               {
                   neighbour.h = heuristic(neighbour,endNode);
                   neighbour.f= neighbour.g + neighbour.f;
                   neighbour.previous=current;
               }
           }
        }
    }
    return {path,visitedNodes,error:"No path found"};
}

function heuristic(a,b)
{
    let d= Math.abs(a.x-a.y)+Math.abs(b.x-b.y);
    return d;
}

export default Astar;