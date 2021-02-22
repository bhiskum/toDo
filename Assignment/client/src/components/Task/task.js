import React from 'react';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";




function Task({ task, index, taskId, removeTask }) {

    return (
        <List>
            <ListItem>
                <ListItemText
                    primary={task.Title}

                />
                <ListItemText
                    primary={task.Status}

                />
                <ListItemSecondaryAction>
                    <button onClick={()=>removeTask(index,taskId)} ><DeleteIcon /></button>
                    <button  ><EditIcon /></button>
                   
                </ListItemSecondaryAction>
                
            </ListItem>
        </List>

    );
}
export default Task;