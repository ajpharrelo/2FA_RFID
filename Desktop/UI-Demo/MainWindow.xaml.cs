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
    public partial class MainWindow : WPFUI.UiWindow
    {
        private User myUser = new User("User123", "Password", 795872506359);
        Auth auth = new Auth("COM15", 115200);
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            scanGood.Visibility = Visibility.Hidden;
            scanBad.Visibility = Visibility.Hidden;

            if (txtuser.Text != "" && txtPass.Text != "")
            {
                if(myUser.Username == txtuser.Text && myUser.Password == txtPass.Password)
                {
                    scanWait.Visibility = Visibility.Visible;
                    auth.Connect();

                    if (auth.IsValid() && scanWait.Visibility == Visibility.Visible)
                    {
                        Task task = new Task(() =>
                        {
                            while (auth.IsValid())
                            {
                                try
                                {
                                    if (auth.GetAuthID() == myUser.CardID)
                                    {
                                        Dispatcher.Invoke(() =>
                                        {
                                            scanWait.Visibility = Visibility.Hidden;
                                            scanGood.Visibility = Visibility.Visible;
                                        });

                                        auth.Disconnect();
                                    }
                                    else
                                    {
                                        Dispatcher.Invoke(() =>
                                        {
                                            scanWait.Visibility = Visibility.Hidden;
                                            scanBad.Visibility = Visibility.Visible;
                                        });
                                    }
                                }
                                catch (System.Exception) { }
                            }
                        });

                        task.Start();
                    }
                    else
                    {
                        MessageBox.Show("Could not connect to card scanning device", "Connection error");
                    }
                }
                else
                {
                    MessageBox.Show("Invalid Username or password", "Bad Login");
                }
            }
            else
            {
                MessageBox.Show("Ensure all fields are filled", "Missing fields");
            }
        }
    }
}
