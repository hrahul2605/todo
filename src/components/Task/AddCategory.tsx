import React, { FunctionComponent, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SCREEN_WIDTH, Category, state, user, colors } from "../../constants";
import Close from "../../assets/icons/close.svg";
import Correct from "../../assets/icons/correct.svg";
import { connect } from "react-redux";
import { updateDetails } from "../../redux/ActionCreator";

const mapStateToProps = (state: state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateDetails: ({ userName, userDesc }: user) =>
    dispatch(updateDetails({ userName, userDesc })),
});

interface Props {
  close: Function;
  type: string;
  addCategory?: (category: Category) => any;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
  user?: user;
  updateDetails?: ({ userName, userDesc }: user) => void;
}

const AddCategory: FunctionComponent<Props> = ({
  close,
  type,
  addCategory,
  setSelectedCategory,
  user,
  updateDetails,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );
  const [userName, setUserName] = useState(user?.userName);
  const [userDesc, setUserDesc] = useState(user?.userDesc);
  const [id, setId] = useState(JSON.stringify(Date.now()));

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.heading }}>
        <Text style={{ ...styles.headingText }}>{type}</Text>
        <TouchableOpacity onPress={() => close()}>
          <Close color="white" />
        </TouchableOpacity>
      </View>
      {type === "Add Category" ? (
        <View style={{ ...styles.detailsContainer }}>
          <View style={{ ...styles.nameInputContainer }}>
            <Text style={{ ...styles.nameText }}>Name</Text>
            <TextInput
              placeholder="Category"
              placeholderTextColor="#FFFF"
              style={{ ...styles.nameInput }}
              value={categoryName}
              onChangeText={(val) => setCategoryName(val)}
            />
          </View>
          <View style={{ ...styles.colorSelectContainer }}>
            <Text style={{ ...styles.nameText }}>Color</Text>
          </View>
          <View style={{ ...styles.colorsContainer }}>
            {colors.map((item) => (
              <TouchableWithoutFeedback
                key={item}
                onPress={() => setCategoryColor(item)}
              >
                <View
                  style={{
                    ...styles.color,
                    backgroundColor: item,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Correct
                    width={12}
                    color="white"
                    style={{ opacity: categoryColor === item ? 1 : 0 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      ) : type === "Rename" ? (
        <>
          <View style={{ ...styles.renameContainer }}>
            <Text style={{ ...styles.renameItemText }}>Name</Text>
            <TextInput
              placeholder={userName}
              placeholderTextColor="#FFFF"
              style={{
                ...styles.nameInput,
                borderColor: "rgba(255, 255, 255, 0.12)",
                borderBottomWidth: 1,
              }}
              onChangeText={(val) => setUserName(val)}
              value={userName}
              onFocus={() => setUserName("")}
            />
          </View>
          <View style={{ height: 24 }} />
          <View style={{ ...styles.renameContainer }}>
            <Text style={{ ...styles.renameItemText }}>Designation</Text>
            <TextInput
              placeholder={userDesc}
              placeholderTextColor="#FFFF"
              style={{
                ...styles.nameInput,
                borderColor: "rgba(255, 255, 255, 0.12)",
                borderBottomWidth: 1,
              }}
              onChangeText={(val) => setUserDesc(val)}
              value={userDesc}
              onFocus={() => setUserDesc("")}
            />
          </View>
          <View style={{ height: 24 }} />
        </>
      ) : null}
      <View style={{ ...styles.buttonContainer }}>
        <TouchableOpacity
          style={{ ...styles.cancelBtn }}
          onPress={() => {
            if (type === "Rename") {
              setUserName(user?.userName);
              setUserDesc(user?.userDesc);
            } else {
              setCategoryName("");
              setCategoryColor(
                colors[Math.floor(Math.random() * colors.length)]
              );
            }
            close();
          }}
        >
          <Text style={{ ...styles.btnText }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.doneBtn }}
          onPress={() => {
            if (
              type === "Add Category" &&
              addCategory !== undefined &&
              setSelectedCategory !== undefined
            ) {
              addCategory({
                categoryName: categoryName,
                categoryColor: categoryColor,
                tasks: [],
                id: id,
                done: [],
              });
              setSelectedCategory(id);
              setTimeout(() => {
                setId(JSON.stringify(Date.now()));
              }, 100);
              setCategoryName("");
              setCategoryColor(
                colors[Math.floor(Math.random() * colors.length)]
              );
            } else if (type === "Rename") {
              if (
                userName !== undefined &&
                userDesc !== undefined &&
                updateDetails !== undefined
              ) {
                updateDetails({ userName, userDesc });
              }
            }
            close();
          }}
          disabled={
            type === "Add Category"
              ? categoryColor === "" || categoryName === ""
              : userName === "" || userDesc === ""
          }
        >
          <Text style={{ ...styles.btnText }}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);

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
  detailsContainer: {
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
    color: "#FFFF",
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
  renameContainer: {
    height: 48,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  renameItemText: {
    fontFamily: "regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
});
