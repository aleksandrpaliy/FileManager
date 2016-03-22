using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Windows;

namespace WebApplication1.models
{
    public struct info
    {
        public string name;
        public string type;
    }
    public struct info_manager
    {
        public string id;
        public string name;
        public string path;
        public info[] info_name;
    }
    public struct data_main
    {
        public string name;
        public string type;
        public int size;
        public string path;
    }
    public struct info_size
    {
        public int Less_10;
        public int More10_Less50;
        public int More50;
    }

    public struct all_info
    {
        public string this_catalog;
        public info_manager[] data_menager;
        public data_main[] main_data;
        public info_size inf_size;
    }
    public class mainModel
    {
        public all_info data;
        
        public int work_with_catalog(DirectoryInfo dir)
        {
//            data = new all_info();
            int size_directory = 0;
            FileInfo[] files_in_this_directory = dir.GetFiles();
            DirectoryInfo[] info_d = dir.GetDirectories();
            for (int i = 0; i < info_d.Length; i++)
            {
                size_directory = work_with_catalog(info_d[i]);
            }
            for (int i = 0;i< files_in_this_directory.Length; i++)
            {
                size_directory += Convert.ToInt32(files_in_this_directory[i].Length);
                if (files_in_this_directory[i].Length <= 10000000)
                {
                    data.inf_size.Less_10++;
                }
                if ((files_in_this_directory[i].Length > 10000000)&&(files_in_this_directory[i].Length <= 50000000))
                {
                    data.inf_size.More10_Less50++;
                }
                if (files_in_this_directory[i].Length > 50000000)
                {
                    data.inf_size.More50++;
                }
            }
            if ((size_directory / 1000000) < 1) return 1;
            else return (size_directory / 1000000);

        }
        public int set_length(FileInfo ob)
        {
            if (ob.Length <= 10000000) data.inf_size.Less_10++;
            if ((ob.Length > 10000000) && (ob.Length <= 50000000)) data.inf_size.More10_Less50++;
            if (ob.Length > 50000000) data.inf_size.More50++;
            return Convert.ToInt32(ob.Length);
        }
        public mainModel()
        {
            data.data_menager = new info_manager[3];
            for (int i = 0; i < 3; i++)
            {
                data.data_menager[i].info_name = new info[3];
                data.data_menager[i].name = ("Home" + i);
                data.data_menager[i].id = ("cat" + i);
                data.data_menager[i].path = ("path/" + i);
                for(int j = 0; j < 3; j++)
                {
                    data.data_menager[i].info_name[j].name = ("name" + j);
                    data.data_menager[i].info_name[j].type = "Directory";
                }
            }
            data.inf_size = new info_size();
//            data.main_data = new data_main[]
            int k = 0;
//            int size_this_directory = 0;
//            string[] path = Directory.GetDirectories(AppDomain.CurrentDomain.BaseDirectory);
            DirectoryInfo dir1 = new DirectoryInfo(AppDomain.CurrentDomain.BaseDirectory);
            DirectoryInfo[] dataDirectory = dir1.GetDirectories();
            FileInfo[] dataFile = dir1.GetFiles();
            data.main_data = new data_main[dataDirectory.Length + dataFile.Length];
            //------------------------------------------------------------------------------
            for (int i = 0; i < dataDirectory.Length; i++)
            {
                data.main_data[k].name = dataDirectory[i].Name;
                data.main_data[k].size = work_with_catalog(dataDirectory[i]);
                data.main_data[k].path = dataDirectory[i].FullName;
                data.main_data[k].type = "Directory";
                k++;
            }
            for (int i = 0; i < dataFile.Length; i++)
            {
                //                size_this_directory += Convert.ToInt32(dataFile[i].Length);
                // Проблемы с записью. Нужно прописать инициализацию всего массива

                data.main_data[k].name = dataFile[i].Name;
                if ((Convert.ToInt32(dataFile[i].Length) / 1000000) < 1) { data.main_data[k].size = 1; }
                else data.main_data[k].size = (Convert.ToInt32(dataFile[i].Length) / 1000000);
                data.main_data[k].type = "File";
                set_length(dataFile[i]);
                k++;
            }
            Console.Write("pause");
            //------------------------------------------------------------------------------
        }
        public mainModel refresh_model(string path)
        {
            data.inf_size = new info_size();
            mainModel obj_model = new mainModel();
            DirectoryInfo dir1 = new DirectoryInfo(path);
            obj_model.data.this_catalog = path;
            string str = path;
            string test = str;
            int count = 0;
            for(;;)
            {
                count++;
                test = test.Substring(test.IndexOf('\\') + 1);
                if ((test.IndexOf('\\') == 0) || ((test.IndexOf('\\') == (-1)))) break;
            }
            obj_model.data.data_menager = new info_manager[count + 1];
            for(int i = count, h = 0; i >=0; i--, h++)
            {
                int t = str.LastIndexOf('\\');
                obj_model.data.data_menager[i].id = "cat" + h;
                obj_model.data.data_menager[i].name = str.Substring((str.LastIndexOf('\\') + 1));
                if(str.LastIndexOf('\\') == (-1))
                {
                    obj_model.data.data_menager[i].path = str.Substring((str.LastIndexOf('\\') + 1));
                    break;
                }
                str = str.Substring(0, str.LastIndexOf('\\'));
                obj_model.data.data_menager[i].path = str;


            }
            // Информация по размеру файлов в текущем и дочерних каталогах
            int k = 0;           
            DirectoryInfo[] dataDirectory = dir1.GetDirectories();
            FileInfo[] dataFile = dir1.GetFiles();

            obj_model.data.main_data = new data_main[dataDirectory.Length + dataFile.Length];
            //------------------------------------------------------------------------------
            for (int i = 0; i < dataDirectory.Length; i++)
            {
                obj_model.data.main_data[k].name = dataDirectory[i].Name;
                obj_model.data.main_data[k].size = work_with_catalog(dataDirectory[i]);
                obj_model.data.main_data[k].path = dataDirectory[i].FullName;
                obj_model.data.main_data[k].type = "Directory";
                k++;
            }
            for (int i = 0; i < dataFile.Length; i++)
            {
                //                size_this_directory += Convert.ToInt32(dataFile[i].Length);
                // Проблемы с записью. Нужно прописать инициализацию всего массива
                obj_model.data.main_data[k].name = dataFile[i].Name;
                if ((Convert.ToInt32(dataFile[i].Length) / 1000000) < 1) { obj_model.data.main_data[k].size = 1; }
                else obj_model.data.main_data[k].size = (Convert.ToInt32(dataFile[i].Length) / 1000000);
                obj_model.data.main_data[k].path = dataFile[i].FullName;
                obj_model.data.main_data[k].type = "File";
                set_length(dataFile[i]);

                
                k++;
            }
            data.inf_size = new info_size();
            work_with_catalog(dir1);
            obj_model.data.inf_size = data.inf_size;
            return obj_model;
        }
    }
}