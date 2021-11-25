// ignore_for_file: file_names

import 'package:flutter/material.dart';

class PasswordPage extends StatefulWidget {
  @override
  State<PasswordPage> createState() => PasswordPageState();
}

class PasswordPageState extends State<PasswordPage> {
  int state = 0;
  double windowHeight = 0;
  double windowWidth = 0;
  double posY = 0;

  @override
  Widget build(BuildContext context) {
    var screen;
    windowHeight = MediaQuery.of(context).size.height;
    windowWidth = MediaQuery.of(context).size.width;
    /* switch (state) {
      case 0:
        posY = windowHeight;
        break;
      case 1:
        posY = 300;
    }*/

    screen = FirstScreen(context);
    return screen;
  }

  Widget FirstScreen(BuildContext context) {
    return Material(
        color: Colors.black,
        child: Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage("assets/images/tt.png"),
                    fit: BoxFit.cover),
              ),
              child: Column(
                children: [
                  Container(
                    alignment: Alignment.topCenter,
                    child: Logo(),
                  ),
                  const SizedBox(height: 50),
                  LoginAndRegisterFields("Password", true),
                  const SizedBox(height: 50),
                  CreateInitialButton("Login"),
                ],
              ),
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

  Widget CreateInitialButton(String name) {
    return Column(
      children: [
        const SizedBox(height: 30),
        ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: CreateButtonHelper(name),
        ),
      ],
    );
  }

  Widget CreateButtonHelper(String buttonName) {
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
              Navigator.pushReplacementNamed(context, "HomePage");
            }),
          },
          child: Text(buttonName),
        ),
      ],
    );
  }

  Widget LoginAndRegisterFields(String tmp, bool tmp2) {
    return Flexible(
      child: TextField(
        obscureText: tmp2,
        decoration: InputDecoration(
          fillColor: Colors.blueGrey.withOpacity(0.9),
          filled: true,
          border: OutlineInputBorder(),
          labelText: tmp,
          hintText: tmp,
        ),
      ),
    );
  }
}
