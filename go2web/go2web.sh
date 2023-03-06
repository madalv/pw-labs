while getopts uh: flag
do
    case "${flag}" in
        u) python3 -W ignore get_content.py $2 ;;
        h) python3 show_help.py ;;
        ?) echo "Unknown flag. Type "./go2web.sh -h" for help." ;;
    esac
done


