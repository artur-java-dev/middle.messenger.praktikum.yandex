import { getValue } from "../../utils/common";
import { Nullable } from "../../utils/common-types";
import { getFilenameAndExtension } from "../../utils/files-utils";
import { Block, compileBlock } from "../../view-base/Block";


type IProps = {
  imagePath: string,
  elementName: string,
}

class ImageSelect extends Block {

  private image: Nullable<Blob> = null;
  private filename: string = "";

  constructor(props: IProps) {

    super(props);

  }

  get data(): Nullable<FormData> {

    if (this.image === null)
      return null;
    const form = new FormData();
    const elName = getValue(this.props, "elementName") as string;
    form.append(elName, this.image, this.filename);
    return form;

  }


  protected render() {

    super.render();

    const btn = this.content.querySelector("#imageBtn")! as HTMLInputElement;
    const input = this.content.querySelector("#imageFileInput")! as HTMLInputElement;

    btn.addEventListener("click", (event) => {

      event.preventDefault();
      input.click();

    });

    input.addEventListener("change",
      () => {

        const fileList = input.files;

        if (!fileList || !fileList[0])
          return;

        const file = fileList[0];

        this.image = file;

        const elName = getValue(this.props, "elementName") as string;
        const ext = getFilenameAndExtension(file.name)[1];
        this.filename = `${elName}.${ext}`;

        const reader = new FileReader();

        reader.onload = function () {

          btn.setAttribute("src", reader.result as string);

        };

        reader.readAsDataURL(file);

      });

  }


  protected override template() {

    return `
    <div class="img-select-block">

      <input type="image" class="image-button" id="imageBtn" src="{{imagePath}}" />

      <input type="file" class="file-select" id="imageFileInput" name="{{elementName}}"
            accept="image/jpeg,image/png,image/gif,image/webp" />

    </div>
    `;

  }

  protected compiledTmpl(): string {

    return compileBlock(this.template(), this.props);

  }


  protected override wasUpdate(_oldProps: IProps, _newProps: IProps) {

    return _oldProps.imagePath !== _newProps.imagePath;

  }

}


export { ImageSelect };
