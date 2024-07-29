import { useState } from "react";
import { Input } from "@renderer/components/ui/input";
import { isEmpty } from "lodash";
import { Combobox } from "@renderer/components/ui/combobox";
import {
  calculateUsedPercent,
  convertBytesToGigaBytes,
} from "@renderer/utils/storage";
import { Progress } from "@renderer/components/ui/progress";

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

/*
 available: 58292469760, free: 58292469760, total: 61975035904 
*/

function Create() {
  const [path, setPath] = useState("");
  const [password, setPassword] = useState("");
  const [volumeSize, setVolumeSize] = useState(1);
  const [volumeDetails, setVolumeDetails] = useState<any>({});

  const handleLocationInput = async () => {
    console.log("handleLocationInput");
    const containerSavePath = await window.api.showNativeSaveDialog({
      title: "new encrypted container",
      // buttonLabel: "Set location",
      defaultPath: "myNewEncryptedContainer.safe",
    });

    if (isEmpty(containerSavePath)) {
      setVolumeDetails({});
      setPath("");
    }

    const volumeStats = await window.api.getVolumeDetails(containerSavePath);
    setVolumeDetails({
      free: convertBytesToGigaBytes(volumeStats.free),
      total: convertBytesToGigaBytes(volumeStats.total),
      percentUsed: calculateUsedPercent(volumeStats.total, volumeStats.free),
    });
    setPath(containerSavePath);
  };

  console.log({ path, algorithms, volumeDetails });

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
        <div data-test-id="size-container">
          <h4 className="scroll-m-20 text-xl font-medium tracking-tight mb-4">
            Container size
          </h4>
          {!!volumeDetails?.percentUsed ? (
            <div className="p-4 grid grid-cols-2">
              <div>
                <p className="leading-7">Size</p>
                {/*TODO: Add MB to the end of the INPUT */}
                <Input
                  className="w-[80%] mt-2"
                  onChange={(e) => setVolumeSize(Number(e.target.value))}
                  type="number"
                  value={volumeSize}
                />
              </div>
              <div className="mt-auto">
                <Progress
                  value={volumeDetails.percentUsed}
                  className={`w-[${volumeDetails.percentUsed}%]`}
                />
                <p className="leading-7 mt-2">
                  {`${volumeDetails.free}GB Free of ${volumeDetails.total}GB - ${volumeDetails.percentUsed}% Used`}
                </p>
              </div>
            </div>
          ) : null}
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
