import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart' as fa;
import 'package:flutter/services.dart';
import 'dart:collection';

import 'package:mobile/route.dart';

Map<String, fa.FaIcon> icons = {
  'facebook': const fa.FaIcon(fa.FontAwesomeIcons.facebook),
  'twitter': const fa.FaIcon(fa.FontAwesomeIcons.twitter),
  'gmail': const fa.FaIcon(fa.FontAwesomeIcons.google),
  'default': const fa.FaIcon(fa.FontAwesomeIcons.idCard)
};

fa.FaIcon getIcon(String name) {
  if (icons.containsKey(name)) {
    return icons[name]!;
  }
  return icons['default']!;
}

List<List> getUsrData() {
  return <List>[
    ['facebook', 'facebook.com', 'admin'], //icon, url, user name
    ['gmail', 'gmail.com', 'admin'],
    ['twitter', 'twitter.com', 'admin'],
    ['test', 'test.com', 'admin'],
    ['test2', 'test2.com', 'admin'],
    ['test3', 'test3.com', 'admin'],
  ];
}

String getUsrPass() {
  return "password";
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  final List<List> allData = getUsrData();
  List<List> currData = getUsrData();

  @override
  Widget build(BuildContext context) {
    Widget page = Scaffold(
      appBar: AppBar(
        toolbarHeight: 40,
        title: const Text("Vault"),
      ),
      body: Column(
        children: <Widget>[getSearchBar(), ...getItemBoxes(currData)],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: fa.FaIcon(fa.FontAwesomeIcons.userSecret), label: "Vault"),
          BottomNavigationBarItem(
              icon: Icon(Icons.settings), label: "Settings"),
        ],
        currentIndex: 0,
        onTap: (index) => {
          if (index == 1)
            Navigator.pushReplacementNamed(context, "SettingsPage")
        },
      ),
    );
    return page;
  }

  Widget getSearchBar() {
    return Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(3),
        ),
        child: TextField(
          decoration: const InputDecoration(
              hintText: 'search', prefixIcon: Icon(Icons.search)),
          onChanged: (text) => {
            currData.clear(),
            for (var data in allData)
              {
                if (data[1].contains(RegExp(text, caseSensitive: false)))
                  currData.add(data),
              },
            setState(() {}), //to update item boxes with the current data value
          },
        ));
  }

  Widget getItemBox(fa.FaIcon icon, String url, String usrName) {
    return Container(
      margin: const EdgeInsets.only(top: 5, left: 2, right: 2),
      child: Ink(
          width: MediaQuery.of(context).size.width,
          height: 50,
          padding: const EdgeInsets.only(left: 5, right: 5),
          decoration: BoxDecoration(
            color: Colors.grey,
            borderRadius: BorderRadius.circular(3),
            boxShadow: const <BoxShadow>[
              BoxShadow(color: Colors.black, spreadRadius: 1),
            ],
          ),
          child: InkWell(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                icon,
                Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Text>[
                      Text(
                        url,
                        style: const TextStyle(
                            fontSize: 14, fontWeight: FontWeight.w500),
                      ),
                      Text(usrName,
                          style: const TextStyle(
                              fontSize: 13, fontWeight: FontWeight.w400)),
                    ]),
                const fa.FaIcon(fa.FontAwesomeIcons.lock),
              ],
            ),
            onTap: () {
              Clipboard.setData(ClipboardData(text: getUsrPass()));
              ScaffoldMessenger.of(context).removeCurrentSnackBar();
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                duration: const Duration(milliseconds: 800),
                backgroundColor: Colors.transparent,
                elevation: 1000,
                behavior: SnackBarBehavior.floating,
                content: Container(
                  width: MediaQuery.of(context).size.width,
                  height: 40,
                  decoration: BoxDecoration(
                      color: Colors.grey,
                      borderRadius: BorderRadius.circular(8)),
                  child:
                      const Center(child: Text("Password copied to clipboard")),
                ),
              ));
            },
            splashColor: Colors.white24,
            highlightColor: Colors.transparent,
          )),
    );
  }

  List<Widget> getItemBoxes(List<List> usrDatas) {
    List<Widget> rv = [];
    for (var data in usrDatas) {
      var icon, url, usrName;
      icon = data[0];
      url = data[1];
      usrName = data[2];
      rv.add(getItemBox(getIcon(icon), url, usrName));
    }
    return rv;
  }
}
