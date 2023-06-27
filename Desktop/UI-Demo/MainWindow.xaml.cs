using System.Windows;
using Authentication.Logic;
using System.Threading;
using WPFUI = Wpf.Ui.Controls;
using System.Threading.Tasks;

namespace UI_Demo
{
    public class User
    { 
        public string Username { get; set; }
        public string Password { get; set; }
        public long CardID { get; set; }

        public User(string user, string pass, long cardID)
        {
            Username = user;
            Password = pass;
            CardID = cardID;
        }
    }

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : UiWindow
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
