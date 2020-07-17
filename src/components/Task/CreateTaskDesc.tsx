import React, { FunctionComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { SCREEN_WIDTH, Category } from "../../constants";
import Plus from "../../assets/icons/plus.svg";

interface Props {
  categories: Category[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTaskDesc: FunctionComponent<Props> = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  desc,
  setDesc,
  setModal,
}) => {
  return (
    <>
      <View style={{ height: 347 }} />
      <View style={{ ...styles.descContainer }}>
        <View style={{ ...styles.descLayer }}>
          <Text style={{ ...styles.text }}>Description</Text>
          <TextInput
            style={{ ...styles.descInput }}
            placeholder="Lorem ipsum dolor sit amet"
            placeholderTextColor="#FFFF"
            value={desc}
            onChangeText={(e) => setDesc(e)}
          />
        </View>
      </View>
      <View style={{ ...styles.categoryContainer }}>
        <View style={{ height: "auto" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ ...styles.text }}>Category</Text>
            <TouchableOpacity onPress={() => setModal(true)}>
              <Plus color="#FFFF" />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.categoryItemContainer }}>
            {categories.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  if (selectedCategory === item.id) {
                    setSelectedCategory("");
                  } else {
                    setSelectedCategory(item.id);
                  }
                }}
              >
                <View
                  style={{
                    ...styles.categoryItem,
                    backgroundColor:
                      selectedCategory === item.id
                        ? item.categoryColor
                        : "#555555",
                  }}
                >
                  <Text
                    style={{
                      ...styles.categoryItemText,
                      color:
                        selectedCategory === item.id
                          ? "#FFFF"
                          : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {item.categoryName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateTaskDesc;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: "regular",
    color: "#DDDDDD",
  },
  descContainer: {
    height: 106,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  descLayer: {
    height: 76,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  descInput: {
    color: "#FFFF",
    fontFamily: "medium",
    fontSize: 16,
    width: SCREEN_WIDTH - 48,
  },
  categoryContainer: {
    height: "auto",
    marginBottom: 50,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 54,
  },
  categoryItemContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  categoryItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginRight: 8,
    elevation: 5,
  },
  categoryItemText: {
    fontFamily: "regular",
    fontSize: 12,
    marginRight: 8,
    marginLeft: 7,
    marginVertical: 4,
  },
});
