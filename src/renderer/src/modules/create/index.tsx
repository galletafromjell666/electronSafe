import { useState } from "react";
import { Input } from "@renderer/components/ui/input";
import { isEmpty } from "lodash";
import { Combobox } from "@renderer/components/ui/combobox";

const algorithms = [
  { label: "AES", value: "aes" },
  { label: "AES(Twofish)", value: "aes_two_fish" },
  { label: "Camellia", value: "camellia" },
];

const hashes = [
  { label: "SHA-512", value: "sha_512" },
  { label: "Whirlpool", value: "whirlpool" },
  { label: "SHA-256", value: "sha-_256" },
];

function Create() {
  const [path, setPath] = useState("");
  const [password, setPassword] = useState("");

  const handleLocationInput = async () => {
    console.log("handleLocationInput");
    const containerSavePath = await window.api.showNativeSaveDialog({
      title: "new encrypted container",
      // buttonLabel: "Set location",
      defaultPath: "myNewEncryptedContainer.safe",
    });

    if (isEmpty(containerSavePath)) return;
    console.log("containerSavePath", containerSavePath);
    setPath(containerSavePath);
  };

  console.log({ path, algorithms });

  return (
    <div className="border-2 m-2 p-4 rounded-lg">
      <h2 className=" scroll-m-20 pb-4 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        Create encrypted container
      </h2>
      <div className="flex flex-col space-y-4">
        <div data-test-id="location-container">
          <h4 className="scroll-m-20 text-xl font-medium tracking-tight mb-4">
            Location
          </h4>
          <Input
            onClick={() => handleLocationInput()}
            type="text"
            placeholder="E:\"
            value={path}
          />
        </div>
        <div data-test-id="password-container">
          <h4 className="scroll-m-20 text-xl font-medium tracking-tight mb-4">
            Password
          </h4>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
        </div>
        <div data-test-id="algorithm-container">
          <h4 className="scroll-m-20 text-xl font-medium tracking-tight mb-4">
            Encryption Algorithm
          </h4>
          <Combobox
            items={algorithms}
            placeholder="Select an algorithm"
            noResultsMessage="No algorithm found"
          />
        </div>
        <div data-test-id="hash-container">
          <h4 className="scroll-m-20 text-xl font-medium tracking-tight mb-4">
            Hash Algorithm
          </h4>
          <Combobox
            items={hashes}
            placeholder="Select a hash algorithm"
            noResultsMessage="No hash algorithm found"
          />
        </div>
      </div>
    </div>
  );
}

export default Create;
