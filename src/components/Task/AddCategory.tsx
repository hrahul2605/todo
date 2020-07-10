import React, { FunctionComponent } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SCREEN_WIDTH } from "../../constants";
import Close from "../../assets/icons/close.svg";

interface Props {
  close: Function;
}

const AddCategory: FunctionComponent<Props> = ({ close }) => {
  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.heading }}>
        <Text style={{ ...styles.headingText }}>Add Category</Text>
        <TouchableOpacity onPress={() => close()}>
          <Close color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.categoryDetailsContainer }}>
        <View style={{ ...styles.nameInputContainer }}>
          <Text style={{ ...styles.nameText }}>Name</Text>
          <TextInput
            placeholder="Category"
            placeholderTextColor="#FFFF"
            style={{ ...styles.nameInput }}
          />
        </View>
        <View style={{ ...styles.colorSelectContainer }}>
          <Text style={{ ...styles.nameText }}>Color</Text>
        </View>
        <View style={{ ...styles.colorsContainer }}>
          <View style={{ ...styles.color, backgroundColor: "#f9be7c" }} />
          <View style={{ ...styles.color, backgroundColor: "#309397" }} />
          <View style={{ ...styles.color, backgroundColor: "#6488e4" }} />
          <View style={{ ...styles.color, backgroundColor: "#E46472" }} />
        </View>
      </View>
      <View style={{ ...styles.buttonContainer }}>
        <TouchableOpacity style={{ ...styles.cancelBtn }} onPress={() => close()} >
          <Text style={{ ...styles.btnText }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.doneBtn }}  onPress={() => close()}>
          <Text style={{ ...styles.btnText }}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    height: 332,
    width: SCREEN_WIDTH - 48,
    marginHorizontal: 24,
    backgroundColor: "#282828",
    borderRadius: 24,
    padding: 24,
  },
  heading: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headingText: {
    color: "#FFFF",
    fontSize: 22,
    fontFamily: "bold",
  },
  categoryDetailsContainer: {
    height: 168,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    paddingVertical: 12,
  },
  nameInputContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  nameText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    fontFamily: "regular",
  },
  nameInput: {
    fontFamily: "medium",
    fontSize: 16,
    width: SCREEN_WIDTH - 96,
  },
  colorSelectContainer: {
    height: 24,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  colorsContainer: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  color: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 72,
    alignItems: "center",
  },
  cancelBtn: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
  },
  doneBtn: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#6488e4",
    width: 120,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "semiBold",
  },
});
