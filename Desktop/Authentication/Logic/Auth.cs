using System.IO.Ports;

namespace Authentication.Logic
{
    public class Auth
    {
        private SerialPort _port = new SerialPort();
        private bool isValid = false;
        public Auth(string portName, int baud)
        {
            _port.PortName = portName;
            _port.BaudRate = baud;
        }

        public static string[] GetPorts()
        {
            return SerialPort.GetPortNames();
        }

        public void Connect()
        {
            try
            {
                _port.Open();
                isValid = true;
            }
            catch (Exception)
            {
                isValid = false;
            }
        }

        public void Disconnect()
        {
            if(_port.IsOpen)
            {
                _port.Close();
                isValid = false;
            }
            else
            {
                throw new Exception("Not currently connected to port");
            }
        }

        public long GetAuthID()
        {
            if (isValid)
            {
                if(_port.BytesToRead > 0)
                {
                    long id;
                    try
                    {
                        id = long.Parse(_port.ReadLine());
                        return id;
                    }
                    catch (Exception)
                    {
                        throw new Exception("Data sent from port invalid");
                    }
                }
                else
                {
                    throw new Exception("No data received from port");
                }
            }
            else
            {
                throw new Exception("Could not verify connection to port");
            }
        }

        public bool IsValid()
        {
            return isValid;
        }
    }
}