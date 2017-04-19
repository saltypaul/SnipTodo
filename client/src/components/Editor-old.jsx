import React, { PureComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Checkbox, Grid, Row, Button, FormControl } from 'react-bootstrap';

export default class Editor extends PureComponent {

  render() {
    const { selectedTodo, setSelectedTodo, uploadTodo } = this.props;
    let ckbox;
    if (selectedTodo && selectedTodo.completed) {
      ckbox = (
        <Checkbox checked id="edit-todo-complete" onClick={ () => setSelectedTodo()}>
        Check
        </Checkbox>
      );
    } else {
      ckbox = (
        <Checkbox id="edit-todo-complete" onClick={ () => setSelectedTodo()}>
        Check
        </Checkbox>
      );
    }
    //const lbCkbox = (<label onClick={ () => setSelectedTodo() }>ckbox</label>);

    const viewText = selectedTodo ? selectedTodo.text : '';

    return (
      <div className="modal fade" id="todo-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <Grid>
          <Row>
            <LinkContainer to="/todolist">
              <Button>Back</Button>
            </LinkContainer>
          </Row>
          <Row>
            <form name="todo-form" action="" onSubmit={() => uploadTodo() }>
              <FormControl
                id="edit-todo-text"
                type="text"
                value={viewText}
                onChange={() => setSelectedTodo()}
              />
              {ckbox}
              <Button type="submit">
                Save
              </Button>
            </form>
          </Row>
        </Grid>
      </div>
    );
  }
}