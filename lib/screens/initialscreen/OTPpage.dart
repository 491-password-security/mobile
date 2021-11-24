// ignore_for_file: file_names

import 'package:flutter/material.dart';

class OTPpage extends StatefulWidget {
  @override
  State<OTPpage> createState() => OTPpageState();
}

class OTPpageState extends State<OTPpage> {
  int state = 0;
  double windowHeight = 0;
  double windowWidth = 0;
  double posY = 0;
  double posYRegister = 0;

  @override
  Widget build(BuildContext context) {
    var screen;
    windowHeight = MediaQuery.of(context).size.height;
    windowWidth = MediaQuery.of(context).size.width;
    switch (state) {
      case 0:
        posY = windowHeight;
        posYRegister = windowHeight;
        break;
      case 1:
        posY = 300;
        break;
      case 2:
        posYRegister = 300;
    }

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
                  LoginAndRegisterFields("Email", false),
                  const SizedBox(height: 50),
                  CreateInitialButton("Login", 1),
                  CreateInitialButton("Register", 2),
                ],
              ),
            ),
            LoginBox(posY),
            RegisterBox(posYRegister),
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

  Widget CreateInitialButton(String name, int i) {
    return Column(
      children: [
        const SizedBox(height: 30),
        ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: CreateButtonHelper(name, i),
        ),
      ],
    );
  }

  Widget CreateButtonHelper(String buttonName, int i) {
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
              if (i == 3) {
                Navigator.pushReplacementNamed(context, "PasswordPage");
              } else {
                state = i;
              }
            }),
          },
          child: Text(buttonName),
        ),
      ],
    );
  }

  Widget LoginBox(double posY) {
    return Stack(
      children: [
        AnimatedContainer(
          duration: Duration(milliseconds: 1000),
          curve: Curves.fastLinearToSlowEaseIn,
          //color: Colors.grey,
          transform: Matrix4.translationValues(0, posY, 1),
          decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.8),
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(15), topRight: Radius.circular(15))),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(height: 30),
              LoginAndRegisterFields("OTP", true),
              const SizedBox(height: 20),
              //LoginAndRegisterFields("Password", false),
              const SizedBox(height: 30),
              Row(
                //mainAxisSize: MainAxisSize.min,
                //crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  CreateInitialButton("Submit", 3),
                  CreateInitialButton("Back", 0)
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget RegisterBox(double posY) {
    return Stack(
      children: [
        AnimatedContainer(
          duration: Duration(milliseconds: 1000),
          curve: Curves.fastLinearToSlowEaseIn,
          //color: Colors.grey,
          transform: Matrix4.translationValues(0, posY, 1),
          decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.8),
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(15), topRight: Radius.circular(15))),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(height: 30),
              LoginAndRegisterFields("Email", true),
              const SizedBox(height: 20),
              LoginAndRegisterFields("Password", false),
              const SizedBox(height: 30),
              Row(
                //mainAxisSize: MainAxisSize.min,
                //crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  CreateInitialButton("Submit", 1),
                  CreateInitialButton("Back", 0)
                ],
              ),
            ],
          ),
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
