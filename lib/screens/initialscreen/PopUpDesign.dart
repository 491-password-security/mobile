// ignore_for_file: file_names

import 'package:flutter/material.dart';

class PopUpDesign extends StatefulWidget {
  @override
  State<PopUpDesign> createState() => PopUpDesignState();
}

class PopUpDesignState extends State<PopUpDesign> {
  @override
  Widget build(BuildContext context) {
    var screen = FirstScreen(context);
    return screen;
  }
}

Widget FirstScreen(BuildContext context) {
  return Material(
      color: Colors.black,
      child: Stack(
        alignment: Alignment.topCenter,
        children: [
          Column(
            //mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Logo(),
              InitialButton("Login", context, 0),
              InitialButton("Register", context, 1),
            ],
          ),
        ],
      ));
}

Widget Logo() {
  return Column(
    children: [
      Image.asset('assets/images/lock.png', width: 250, height: 250),
      const Text("Password Security",
          style: TextStyle(
              fontSize: 25,
              fontStyle: FontStyle.normal,
              color: Colors.white,
              decoration: TextDecoration.none))
    ],
  );
}

Widget InitialButton(String name, BuildContext context, int tmp) {
  return Stack(
    children: [
      const SizedBox(height: 30),
      ClipRRect(
        borderRadius: BorderRadius.circular(15),
        child: CreateButton(name, context, tmp),
      ),
    ],
  );
}

Widget CreateButton(String buttonName, BuildContext context, int tmp) {
  return Stack(
    children: <Widget>[
      Positioned.fill(
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: <Color>[
                Color(0xFF212121),
                Color(0xFF303030),
              ],
            ),
          ),
        ),
      ),
      TextButton(
        style: TextButton.styleFrom(
          padding: const EdgeInsets.all(16.0),
          primary: Colors.white,
          textStyle: const TextStyle(fontSize: 20),
        ),
        onPressed: () => {
          if (tmp == 0)
            {
              CreatePopUp(context, "Login"),
            }
          else if (tmp == 1)
            {
              CreatePopUp(context, "Register"),
            }
        },
        child: Text(buttonName),
      ),
    ],
  );
}

Widget CreateTextField(String tmp, bool tmp2) {
  return Flexible(
    child: TextField(
      obscureText: tmp2,
      decoration: InputDecoration(
        //fillColor: Colors.white
        fillColor: Colors.grey, filled: true,
        border: OutlineInputBorder(),
        labelText: tmp,
        hintText: tmp,
      ),
    ),
  );
}

Widget? CreatePopUp(BuildContext context, String tmp) {
  showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.blueGrey,
          actions: <Widget>[
            Container(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  CreateTextField("Username", false),
                  CreateTextField("Password", true),
                  const SizedBox(height: 30),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(15),
                    child: CreatePopUpButton(tmp, context),
                  ),
                ],
              ),
            )
          ],
        );
      });
  return null;
}

Widget CreatePopUpButton(String buttonName, BuildContext context) {
  return Stack(
    children: <Widget>[
      Positioned.fill(
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: <Color>[
                Color(0xFF212121),
                Color(0xFF303030),
              ],
            ),
          ),
        ),
      ),
      TextButton(
        style: TextButton.styleFrom(
          padding: const EdgeInsets.all(16.0),
          primary: Colors.white,
          textStyle: const TextStyle(fontSize: 20),
        ),
        onPressed: () => {},
        child: Text(buttonName),
      ),
    ],
  );
}





 /* class initialPageState extends State<initialPage> {
  int state = 0;
  double windowHeight = 0;
  double windowWidth = 0;
  double posY = 0;

  @override
  Widget build(BuildContext context) {
    var screen;

    //double ypos = 0;
    //screen = FirstScreen(context, ypos);
    if (state == 0) {
      screen = FirstScreen(context, 0);
    } else if (state == 1) {
      screen = LoginScreen();
    }

    return screen;
  }

 Widget FirstScreen(BuildContext context, double ypos) {
    return Container(
      alignment: Alignment.topCenter,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Image.asset('assets/images/lock.png', width: 250, height: 250),
          Name(),
          const SizedBox(height: 30),
          ClipRRect(
            borderRadius: BorderRadius.circular(15),
            child: Button("Login", context, 1),
          ),
          const SizedBox(height: 30),
          ClipRRect(
            borderRadius: BorderRadius.circular(15),
            child: Button("Register", context, 2),
          ),
        ],
      ),
    );
  }

  Text Name() {
    return Text("Password Security",
        style: TextStyle(
            fontSize: 25,
            fontStyle: FontStyle.normal,
            color: Colors.white,
            decoration: TextDecoration.none));
  }

  Widget Button(String buttonName, BuildContext context, int i) {
    return Stack(
      children: <Widget>[
        Positioned.fill(
          child: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: <Color>[
                  Color(0xFF212121),
                  Color(0xFF303030),
                ],
              ),
            ),
          ),
        ),
        TextButton(
          style: TextButton.styleFrom(
            padding: const EdgeInsets.all(16.0),
            primary: Colors.white,
            textStyle: const TextStyle(fontSize: 20),
          ),
          onPressed: () => {
            setState(() {
              state = i;
            }),
          },
          child: Text(buttonName),
        ),
      ],
    );
  }

    Widget? LoginPopUp(BuildContext context, String choice) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            backgroundColor: Colors.blueGrey,
            actions: <Widget>[
              Container(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    TextField(
                      obscureText: true,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Username',
                        hintText: 'Enter Username',
                      ),
                    ),
                    TextField(
                      obscureText: true,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Password',
                        hintText: 'Enter Password',
                      ),
                    ),
                    const SizedBox(height: 30),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(15),
                      child: ButtonPopUp(choice, context),
                    ),
                    const SizedBox(height: 30),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(15),
                      child: ButtonPopUp("Back", context),
                    ),
                  ],
                ),
              )
            ],
          );
        });
    return null;
  }

  Widget ButtonPopUp(String buttonName, BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned.fill(
          child: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: <Color>[
                  Color(0xFF212121),
                  Color(0xFF303030),
                ],
              ),
            ),
          ),
        ),
        TextButton(
          style: TextButton.styleFrom(
            padding: const EdgeInsets.all(16.0),
            primary: Colors.white,
            textStyle: const TextStyle(fontSize: 20),
          ),
          onPressed: () {
            //LoginPopUp(context);
          },
          child: Text(buttonName),
        ),
      ],
    );
  }*/
