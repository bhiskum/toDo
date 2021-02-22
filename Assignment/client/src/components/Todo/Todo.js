import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Task from '../Task/task';
import CreateTask from '../CreateTask/createtask';
import { makeStyles } from '@material-ui/core/styles';
import jsPDF from "jspdf";
import { Button } from "@material-ui/core";
import "jspdf-autotable";
import Grid from '@material-ui/core/Grid';

import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 10
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    }
}));



function Todo() {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        getUserDetails();
    }, []);

    async function getUserDetails() {

        const content = await Axios.get('http://localhost:3000/api/user', { withCredentials: true });
        getTasks(content.data.userId);
        setLoading(false);

    }

    async function getTasks(id) {
        console.log(id);
        await Axios.get(`http://localhost:3000/Tasks/${id}`, { withCredentials: true }).then(function (response) {
            setTasks(response.data)
        });

    }


    async function addTask(Title, Status) {
        const param = {
            Title: Title,
            Status: Status
        }
        await Axios.post('http://localhost:3000/Tasks', param, { withCredentials: true });

        const newTasks = [...tasks, { Status, Title }];
        setTasks(newTasks);
    };


    async function removeTask(index, taskId) {
        await Axios.delete('http://localhost:3000/Tasks/' + taskId, { withCredentials: true }).then(function (response) {
            console.log(response)
        });
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };



    async function exportPDF() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Task Report";
        const headers = [["Task", "Status"]];

        const data = tasks.map(elt => [elt.Title, elt.Status]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    if (loading) {
        return <div>Please login</div>
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item md={6} sm={6} xs={12}>
                    <Typography variant="h6" >
                        Todo Items
                    </Typography>
                    <div className={classes.demo}>
                        {tasks.map((task, index) => (
                            <Task
                                task={task}
                                index={index}
                                taskId={task.ID}
                                removeTask={removeTask}
                                key={index}
                            />
                        ))}
                    </div>
                </Grid>
                <Grid item md={3} sm={5} xs={12}>
                    <CreateTask addTask={addTask} />
                </Grid>
                <Grid>
                    <Button variant="contained" color="primary" onClick={exportPDF}>Generate Report</Button>

                </Grid>


            </Grid>
        </div>

    );
}

export default Todo;