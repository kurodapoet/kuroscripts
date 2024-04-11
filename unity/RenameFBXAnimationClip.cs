
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

public class MixamoManager : EditorWindow
{
    private static MixamoManager editor;
    private static int width = 350;
    private static int height = 180;
    private static int x = 0;
    private static int y = 0;
    private static List<string> allFiles = new List<string>();
    private StreamWriter w;
    private string animationsTag = "";
    private bool useTag = false;
    private string lowerTag = "";
    private static string searchFbxPath = "";

    [MenuItem("Window/KUROOOO")]
    static void ShowEditor()
    {
        editor = EditorWindow.GetWindow<MixamoManager>();
        CenterWindow();
    }

    private void OnGUI()
    {
        GUILayout.Label("Settings", EditorStyles.boldLabel);
        GUILayout.Space(1);
        useTag = GUILayout.Toggle(useTag, "Use Tag");
        if (useTag)
        {
            GUI.enabled = true;
        }
        else
        {
            GUI.enabled = false;
        }
        animationsTag = GUI.TextField(new Rect(5, 40, 60, 20), animationsTag, 25);

        GUI.enabled = true;
        GUILayout.Space(20);
        GUILayout.Label("Hard Disk Search Path Example(/test/fbxfiles/)");
        searchFbxPath = GUI.TextField(new Rect(5, 80, 60, 20), searchFbxPath, 200);

        GUILayout.Space(70);
        GUI.enabled = true;
        if (GUILayout.Button("Rename"))
        {
            allFiles = new List<string>();
            var fName = Path.Combine(@"c:\temp", "names.txt");
            w = new StreamWriter(fName);
            Rename();
            w.Close();
        }
    }

    public void Rename()
    {
        DirSearch();

        if (allFiles.Count > 0)
        {
            for (int i = 0; i < allFiles.Count; i++)
            {
                int idx = allFiles[i].IndexOf("Assets");
                string filename = Path.GetFileName(allFiles[i]);
                string asset = allFiles[i].Substring(idx);
                AnimationClip orgClip = (AnimationClip)AssetDatabase.LoadAssetAtPath(
                    asset, typeof(AnimationClip));

                var fileName = Path.GetFileNameWithoutExtension(allFiles[i]);
                var importer = (ModelImporter)AssetImporter.GetAtPath(asset);

                RenameAndImport(importer, fileName);
            }
        }
    }

    private void RenameAndImport(ModelImporter asset, string name)
    {
        ModelImporter modelImporter = asset as ModelImporter;
        ModelImporterClipAnimation[] clipAnimations = modelImporter.defaultClipAnimations;


        for (int i = 0; i < clipAnimations.Length; i++)
        {
            if (useTag && animationsTag != "")
            {
                lowerTag = animationsTag.ToLower() + name;
                clipAnimations[i].name = lowerTag;
            }
            else
            {
                clipAnimations[i].name = name;
            }
            w.WriteLine(clipAnimations[i].name);
        }

        modelImporter.clipAnimations = clipAnimations;
        modelImporter.SaveAndReimport();
    }

    private static void CenterWindow()
    {
        editor = EditorWindow.GetWindow<MixamoManager>();
        x = (Screen.currentResolution.width - width) / 2;
        y = (Screen.currentResolution.height - height) / 2;
        editor.position = new Rect(x, y, width, height);
        editor.maxSize = new Vector2(width, height);
        editor.minSize = editor.maxSize;
    }

    static void DirSearch()
    {
        string info = Application.dataPath + searchFbxPath;
        if (!Directory.Exists(info))
        {
            Debug.Log("Directory not exist");
        }
        else
        {
            string[] fileInfo = Directory.GetFiles(info, "*.fbx", SearchOption.AllDirectories);
            foreach (string file in fileInfo)
            {
                if (file.EndsWith(".fbx"))
                    allFiles.Add(file);
            }
        }
    }
}
