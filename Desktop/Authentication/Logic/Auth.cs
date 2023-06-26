using System.IO.Ports;

namespace Authentication.Logic
{
    public class Auth
    {
        private SerialPort _port = new SerialPort();
        private bool portValid = false;
        public Auth(string portName, int baud)
        {
            _port.PortName = portName;
            _port.BaudRate = baud;
        }

        public void Connect()
        {
            try
            {
                _port.Open();
                portValid = true;
            }
            catch (Exception)
            {
                portValid = false;
            }
        }

        public void Disconnect()
        {
            if(_port.IsOpen)
            {
                _port.Close();
                portValid = false;
            }
            else
            {
                throw new Exception("Not currently connected to port");
            }
        }

        public long GetAuthID()
        {
            if (portValid)
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
                throw new Exception("Could not verify connection to port");
            }
        }

        public bool PortValid()
        {
            return portValid;
        }
    }
}