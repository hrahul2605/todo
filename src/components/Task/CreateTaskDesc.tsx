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
import Edit from "../../assets/icons/edit.svg";
import Plus from "../../assets/icons/plus.svg";

interface Props {
  animateModal: () => void;
  categories: Category[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
}

const CreateTaskDesc: FunctionComponent<Props> = ({
  animateModal,
  categories,
  setSelectedCategory,
  selectedCategory,
  desc,
  setDesc,
}) => {
  return (
    <>
      <View style={{ height: 315 }} />
      <View style={{ ...styles.timeContainer }}>
        <View style={{ ...styles.container }}>
          <View style={{ ...styles.timeTextContainer }}>
            <Text style={{ ...styles.timeText }}>Start time</Text>
            <Text style={{ ...styles.hourText }}>4.00</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.ampmText }}>PM</Text>
          </View>
        </View>
        <View style={{ ...styles.container }}>
          <View style={{ ...styles.timeTextContainer }}>
            <Text style={{ ...styles.timeText }}>End time</Text>
            <Text style={{ ...styles.hourText }}>8.00</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.ampmText }}>PM</Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.descContainer }}>
        <View style={{ ...styles.descLayer }}>
          <Text style={{ ...styles.timeText }}>Description</Text>
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
            <Text style={{ ...styles.timeText }}>Category</Text>
            <TouchableOpacity onPress={() => animateModal()}>
              <Plus color="#FFFF" />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.categoryItemContainer }}>
            {categories.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  if (selectedCategory === item.categoryName) {
                    setSelectedCategory("");
                  } else {
                    setSelectedCategory(item.categoryName);
                  }
                }}
              >
                <View
                  style={{
                    ...styles.categoryItem,
                    backgroundColor:
                      selectedCategory === item.categoryName
                        ? item.categoryColor
                        : "#555555",
                  }}
                >
                  <Text
                    style={{
                      ...styles.categoryItemText,
                      color:
                        selectedCategory === item.categoryName
                          ? "#FFFF"
                          : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {item.categoryName}
                  </Text>
                  <View>
                    <Edit width={12} color="white" />
                  </View>
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
  timeContainer: {
    height: 96,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  container: {
    width: 144,
    height: 48,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  timeTextContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 92,
  },
  timeText: {
    fontSize: 12,
    fontFamily: "regular",
    color: "#DDDDDD",
  },
  hourText: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#FFFF",
    marginTop: 8,
  },
  ampmText: {
    top: 22,
    fontSize: 16,
    fontFamily: "medium",
    color: "#FFFF",
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
    paddingBottom: 34,
  },
  categoryItemContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    marginHorizontal: 12,
  },
  categoryItem: {
    width: "auto",
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    marginRight: 12,
  },
  categoryItemText: {
    fontFamily: "regular",
    fontSize: 12,
    marginRight: 15,
    marginLeft: 7,
    marginVertical: 4,
  },
});
