import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap"
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";



export default function TaskList({ task }) {
    const [tasks, setTasks] = useState([])

    var dateObj = new Date()
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = month + "/" + day + "/" + year;

    const navigate = useNavigate()
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    const getMyTasks = () => {
        fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}&completed=false`)
            .then((res) => res.json())
            .then(setTasks);
    }

    const setCompletedTask = (task) => {
        const sendToApi = {
            userId: cookijarUserObject.id,
            taskDescription: task.taskDescription,
            typeId: task.typeId,
            points: task.points,
            startDate: task.startDate,
            completedDate: newdate,
            completed: true
        }
        fetch(`http://localhost:8088/tasks/${task.id}?userId=${cookijarUserObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendToApi)
        })
        window.alert(`Great job ${cookijarUserObject.name}!`)
        getMyTasks()
    }

    const deleteTask = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE",
        }).then((res) => res.json())
            .then(() => { getMyTasks() })
    }

    useEffect(() => {
        getMyTasks()
    }, [])

    return (<>
        <Container fluid>
            <Row className="justify-content-md-center">
                {tasks.map(task => {
                    return <>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{task.taskDescription}</Card.Title>
                                    <Card.Text>
                                        Point Value:
                                        {task.points}{""}
                                    </Card.Text>
                                    <br />
                                    <ButtonGroup bsSize="x-s">
                                        <Button variant="secondary" href={
                                            `/tasks/edit/${task.id}`
                                        }>Edit Task</Button>
                                        <Button variant="success" onClick={() => { setCompletedTask(task); }}>Completed</Button>
                                        <Button variant="danger" onClick={() => { deleteTask(task.id); }}>Delete</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>
                }
                )}
            </Row>
        </Container>
    </>
    )
}