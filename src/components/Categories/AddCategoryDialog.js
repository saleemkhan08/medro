import React, { Component } from "react";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import { addCategory } from "./CategoryActions";
export class AddCategoryDialog extends Component {
  state = {
    open: true,
    category: ""
  };

  addCategory = () => {
    this.props.dispatch(addCategory(this.state.category));
    this.props.onClose();
  };
  render() {
    return (
      <Dialog.Container visible={this.state.open && this.props.open}>
        <Dialog.Title>Add Category</Dialog.Title>
        <Dialog.Input
          placeholder="Category Name"
          onChangeText={text => this.setState({ category: text })}
        />
        <Dialog.Button label="ADD" onPress={this.addCategory} />
        <Dialog.Button
          label="CANCEL"
          onPress={() => {
            this.props.onClose();
          }}
        />
      </Dialog.Container>
    );
  }
}

export default connect()(AddCategoryDialog);
