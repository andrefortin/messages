/**
 * An object which allows two way communication with other pages.
 */
type Port = chrome.runtime.Port

/**
 * The extension frame name or content script tab id.
 */
type PortName = string | number

/**
 * Private API.
 *
 * Use for internal state management.
 * Similar to a Map, but where Map would use a Map, Ports uses a Ports object.
 */
interface Ports {
  /**
   * Get a port by its name
   */
  get: (key: PortName) => Port | undefined
  /**
   * Set a port by its name
   */
  set: (key: PortName, port: Port) => Ports
  /**
   * Remove a port by its name
   */
  delete: (key: PortName) => boolean
  /**
   * Remove all ports
   */
  clear: () => void
  /**
   * Iterate over each port
   */
  forEach: (
    callback: (port: Port, key: PortName, ports: Ports) => void,
  ) => void

  has: (key: PortName) => boolean
  entries: () => IterableIterator<[PortName, Port]>
  keys: () => IterableIterator<PortName>
  values: () => IterableIterator<Port>

  /**
   * Event that fires when a port is added
   */
  onConnect: CallableEvent<
    (name: PortName, port: Port, ports: Ports) => void,
    (name: PortName, port: Port) => void
  >
  /**
   * Event that fires when a port receives a message
   */
  onMessage: CallableEvent<
    (message: CoreMessage, port: Port, ports: Ports) => void,
    (message: CoreMessage, port: Port) => void
  >

  size: number
}

/**
 * Private API.
 *
 * Send a response to a script. Id must match previously received message.
 */
type PrivateRespond = (message: CoreResponse) => void

/**
 * Private API.
 *
 * Send a message to a script. Id should be unique.
 */
type PrivateSend = (message: CoreMessage) => void
