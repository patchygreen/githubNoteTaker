import React from "react";

import { View, Text, Button, Image, Platform } from "react-native";

import { createStackNavigator } from "react-navigation";

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require("./images/spiro.png")}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParam("increaseCount")}
          title="+1"
          color={Platform.OS === "ios" ? "#fff" : null}
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Text>Count: {this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate("Details", {
              itemId: this.state.count,
              otherParam: "First Details"
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.otherParam : "A Nested Details Screen",
      /* These values are used instead of shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };
  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: "Updated!" })
          }
        />
        <Button
          title="Go to Home... again"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
