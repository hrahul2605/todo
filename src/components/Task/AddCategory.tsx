import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import {
  SCREEN_WIDTH,
  Category,
  state,
  user,
  colors,
  SCREEN_HEIGHT,
  WINDOW_HEIGHT,
} from "../../constants";
import Close from "../../assets/icons/close.svg";
import Correct from "../../assets/icons/correct.svg";
import { connect } from "react-redux";
import { updateDetails, editCategory } from "../../redux/ActionCreator";

const mapStateToProps = (state: state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateDetails: ({ userName, userDesc }: user) =>
    dispatch(updateDetails({ userName, userDesc })),
  editCategory: ({
    categoryColor,
    categoryName,
    id,
  }: {
    categoryColor: string;
    categoryName: string;
    id: string;
  }) =>
    dispatch(
      editCategory({
        categoryColor,
        categoryName,
        id,
      })
    ),
});

interface Props {
  type: string;
  addCategory?: (category: Category) => any;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
  user?: user;
  updateDetails?: ({ userName, userDesc }: user) => void;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  editCategoryId?: string;
  editCategoryName?: string;
  editCategoryColor?: string;
  editCategory?: ({
    categoryColor,
    categoryName,
    id,
  }: {
    categoryColor: string;
    categoryName: string;
    id: string;
  }) => void;
}

const AddCategory: FunctionComponent<Props> = ({
  type,
  addCategory,
  setSelectedCategory,
  user,
  updateDetails,
  modal,
  setModal,
  editCategoryColor,
  editCategoryId,
  editCategoryName,
  editCategory,
}) => {
  const [categoryName, setCategoryName] = useState(
    editCategoryName !== undefined ? editCategoryName : ""
  );
  const [categoryColor, setCategoryColor] = useState(
    editCategoryColor !== undefined
      ? editCategoryColor
      : colors[Math.floor(Math.random() * colors.length)]
  );

  const [userName, setUserName] = useState(user?.userName);
  const [userDesc, setUserDesc] = useState(user?.userDesc);
  const [id, setId] = useState(JSON.stringify(Date.now()));

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modal) {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
        mass: 0.5,
      }).start();
    } else {
      Animated.spring(opacity, {
        toValue: 0,
        useNativeDriver: true,
        mass: 0.3,
      }).start(() =>
        setCategoryColor(
          editCategoryColor !== undefined
            ? categoryColor
            : colors[Math.floor(Math.random() * colors.length)]
        )
      );
    }
  }, [modal]);

  const scale = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0.7, 0.7, 1],
  });

  const translateY = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, -SCREEN_HEIGHT, -SCREEN_HEIGHT],
  });

  useEffect(() => {
    setCategoryName(editCategoryName !== undefined ? editCategoryName : "");
    setCategoryColor(
      editCategoryColor !== undefined
        ? editCategoryColor
        : colors[Math.floor(Math.random() * colors.length)]
    );
  }, [editCategoryName, editCategoryName, editCategoryId]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        top: WINDOW_HEIGHT,
        height: WINDOW_HEIGHT,
        elevation: 10,
        opacity,
        transform: [{ scale, translateY }],
      }}
    >
      <View style={{ ...styles.container }}>
        <View style={{ ...styles.heading }}>
          <Text style={{ ...styles.headingText }}>{type}</Text>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Close color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.detailsContainer }}>
          <Text style={{ ...styles.nameText }}>Name</Text>
          <TextInput
            placeholder={type !== "Rename" ? "Category" : userName}
            placeholderTextColor="#FFFF"
            style={{
              ...styles.nameInput,
              borderColor: "rgba(255, 255, 255, 0.12)",
              borderBottomWidth: 1,
            }}
            value={type !== "Rename" ? categoryName : userName}
            onChangeText={(val) =>
              type !== "Rename" ? setCategoryName(val) : setUserName(val)
            }
            onFocus={() => (type === "Rename" ? setUserName("") : null)}
          />
          {type !== "Rename" ? (
            <>
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
                        width: categoryColor === item ? 32 : 24,
                        height: categoryColor === item ? 32 : 24,
                        borderRadius: categoryColor === item ? 32 : 24,
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
            </>
          ) : (
            <>
              <View style={{ height: 24 }} />
              <View style={{ ...styles.renameContainer }}>
                <Text style={{ ...styles.renameItemText }}>Status</Text>
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
          )}
        </View>
        <View style={{ ...styles.buttonContainer }}>
          <TouchableOpacity
            style={{ ...styles.cancelBtn }}
            onPress={() => {
              if (type === "Rename") {
                setUserName(user?.userName);
                setUserDesc(user?.userDesc);
              } else if (type === "Add Catgegory") {
                setCategoryName("");
              }
              setModal(false);
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
              } else if (type === "Rename") {
                if (
                  userName !== undefined &&
                  userDesc !== undefined &&
                  updateDetails !== undefined
                ) {
                  updateDetails({ userName, userDesc });
                }
              } else {
                if (
                  editCategory !== undefined &&
                  editCategoryId !== undefined
                ) {
                  editCategory({
                    categoryColor: categoryColor,
                    categoryName: categoryName,
                    id: editCategoryId,
                  });
                }
              }
              setModal(false);
            }}
            disabled={
              type === "Add Category" || type === "Edit Category"
                ? categoryColor === "" || categoryName === ""
                : userName === "" || userDesc === ""
            }
          >
            <Text style={{ ...styles.btnText }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
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
    elevation: 10,
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
    justifyContent: "center",
    alignItems: "center",
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
